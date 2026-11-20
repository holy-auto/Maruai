// サイトで使っているイメージ写真（自社の施工写真ではないもの）の出典。
// CC BY / CC BY-SA の条件（撮影者名・出典・ライセンスへのリンク・加工の有無）をフッターに表示する。
// 自社の写真に差し替えたら、ここから外す。
export type PhotoCredit = {
  src: string; // public/ 以下のパス
  author: string;
  source: string; // Wikimedia Commons のファイルページ
  license: string;
  licenseUrl: string;
};

export const PHOTO_CREDITS: PhotoCredit[] = [
  {
    src: '/images/stock/tsukubamirai-street.jpg',
    author: 'Otherde',
    source: 'https://commons.wikimedia.org/wiki/File:Youkoudai4_1_Tsukubamirai-city.JPG',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  {
    src: '/images/stock/roller-wall.jpg',
    author: 'Michael Cory',
    source: 'https://commons.wikimedia.org/wiki/File:Paint_roller_4.jpg',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
  },
  {
    src: '/images/stock/paint-supplies.jpg',
    author: 'David Mulder',
    source: 'https://commons.wikimedia.org/wiki/File:Indoor_painting_supplies_(30185142347).jpg',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
  },
  {
    src: '/images/stock/roof-tiles-sealing.jpg',
    author: 'Hawatechnoseo3',
    source: 'https://commons.wikimedia.org/wiki/File:Roofing_Service_Singapore.jpg',
    license: 'CC0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
  },
  {
    src: '/images/stock/caulking-gun.jpg',
    author: 'Achim Hering',
    source: 'https://commons.wikimedia.org/wiki/File:Caulking.jpg',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
  },
  {
    src: '/images/stock/roof-waterproofing.jpg',
    author: 'Μάριος Μητσόγλου',
    source: 'https://commons.wikimedia.org/wiki/File:Roof_waterproofing_system_application_by_Monotica_Athens.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
];
