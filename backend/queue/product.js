const Queue = require('bull');
const { Product } = require('../models');
const redis = require('../config/redisClient');

// Configurar a fila "productQueue"
const productQueue = new Queue('productQueue', {
  redis: {
    host: redis.options.host,
    port: redis.options.port,
    password: redis.options.password,
  },
});

// Processador da fila
productQueue.process(async (job) => {
  const { operation, data } = job.data;

  switch (operation) {
    case 'create': {
      const product = await Product.create(data);
      await redis.del('products:list');
      console.log('Produto criado e cache invalidado.');
      return product;
    }

    case 'update': {
      const { id, updatedData } = data;

      const product = await Product.findOne({ where: { id } });
      if (!product) throw new Error('Produto não encontrado.');

      await product.update(updatedData);
      await redis.del('products:list');
      console.log('Produto atualizado e cache invalidado.');
      return product;
    }

    default:
      throw new Error('Operação inválida.');
  }
});

// Eventos da fila
productQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} concluído com sucesso:`, result);
});

productQueue.on('failed', (job, error) => {
  console.error(`Job ${job.id} falhou:`, error.message);
});

productQueue.on('active', (job) => {
  console.log(`Job ${job.id} está ativo.`);
});

module.exports = productQueue;
