const Queue = require('bull');
const { Category, Product } = require('../models');
const redis = require('../config/redisClient');
const transporter = require('../config/nodemailer');

// Configurar a fila "categoryQueue"
const categoryQueue = new Queue('categoryQueue', {
  redis: {
    host: redis.options.host,
    port: redis.options.port,
    password: redis.options.password,
  },
});

// Processador da fila
categoryQueue.process(async (job) => {
  const { operation, data } = job.data;

  switch (operation) {
    case 'create': {
      const category = await Category.create(data);
      await redis.del('categories:list');
      console.log('Cache de categorias invalidado.');

      // Enviar email de notificação
      const mailOptions = {
        from: 'paulo.gomes@uncisal.edu.br',
        to: 'paulohenriquegomessilva1@gmail.com',
        subject: 'Nova categoria criada',
        html: `<p>Uma nova categoria foi criada na aula do dia 18/11/2024: ${category.name}</p>`,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email de notificação enviado.');
      return category;
    }

    case 'update': {
      const { id, updatedData } = data;

      const category = await Category.findOne({
        where: { id },
        include: [{ model: Product }],
      });

      if (!category) throw new Error('Categoria não encontrada.');

      await category.update(updatedData);
      await redis.del('categories:list');
      console.log('Categoria atualizada e cache invalidado.');
      return category;
    }

    default:
      throw new Error('Operação inválida.');
  }
});

// Eventos da fila
categoryQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} concluído com sucesso:`, result);
});

categoryQueue.on('failed', (job, error) => {
  console.error(`Job ${job.id} falhou:`, error.message);
});

categoryQueue.on('active', (job) => {
  console.log(`Job ${job.id} está ativo.`);
});

module.exports = categoryQueue;
