import { prismaMock } from '../../../singleton';
import { channelRepository } from '../channelRepository';

describe('channelRepository', () => {
  describe('getAllChannels', () => {
    it('should return all items', async () => {
      prismaMock.channel.findMany.mockResolvedValue([
        {
          id: 'cl8powt0c0000bqe5zulg30rz',
          name: 'MOSHINA BOZOR l Rasmiy Kanal',
          description:
            '✅ Телеграм тармоғидаги Автомобиллар учун энг оммабоп  савдо канали "MOSHINA BOZOR"га хуш келибсиз📝 Эълон бериш учун: @Yutouz_Admin га ёзинг Эълон бериш ПУЛЛИК!Kvartira ijarasi - @KvartiraNamoz vaqtlari - @Abuhurayrabot',
          avatar: '//static7.tgstat.ru/channels/_0/22/229796c9416d0f85add2a9630f4e38a5.jpg',
          url: 'https://t.me/moshina',
          isArchived: true,
          isBlogger: true,
          subscribers: 659655,
          er: 3,
          malePercent: 0,
          views: 19892,
          cpv: 0,
          postPrice: 0,
          categoryId: '2',
          lastUpdateDateTime: new Date(Date.parse('11-11-2011')),
          cartId: '1',
          lastUpdateFromTelegram: null,
          postsLast30days: null,
          viewsLast30days: null,
        },
        {
          id: 'cl8powt1d0014bqe5k2u32ir1',
          name: 'Edu.uz — DTM.uz — Abituriyentlar.uz — Oliygoh.uz — Abt.uz — Taʼlim kanallar — Xushnudbek.uz — xabar',
          description:
            "- Ta'limga oid eng tezkor xabar va yangiliklar!📩 @DTMreklamaUshbu kanalda abituriyentlar uchun edu.uz dtm.uz xushnudbek.uz kabi taʼlimga oid rasmiy manbalardagi xabarlar sodda tilda yoritiladi.",
          avatar: '//static10.tgstat.ru/channels/_0/8a/8af36f65589b23173d30b473709b7b81.jpg',
          url: 'https://t.me/eduuz_DTMuzb_abituriyent_oliygoh',
          isArchived: true,
          isBlogger: true,
          subscribers: 651404,
          er: 6,
          malePercent: 0,
          views: 41042,
          cpv: 0,
          postPrice: 0,
          categoryId: '3',
          lastUpdateDateTime: new Date(Date.parse('11-11-2011')),
          cartId: '2',
          lastUpdateFromTelegram: null,
          postsLast30days: null,
          viewsLast30days: null,
        },
      ]);

      const channels = await channelRepository.getAllChannels();

      expect(channels).toHaveLength(2);
    });
  });
});
