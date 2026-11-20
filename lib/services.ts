// lib/services.ts
export type Service = {
  slug: string;
  name: string;
  serviceType: string;
  lead: string;
  symptoms: string[];
  priceFrom: string;
  metaDescription: string;
  image?: string; // 写真のパス（例: /images/services/gaiheki.jpg）。指定すると写真を表示
  imageAlt?: string; // 写真の説明。省略時は「〇〇の施工写真」
  imageIsStock?: boolean; // 自社の施工写真ではないイメージ写真なら true（「イメージ写真」と添える）
  imagePosition?: string; // 枠に収めるときの位置（CSS object-position）。省略時は上寄せ
};

export const SERVICES: Record<string, Service> = {
  'gaiheki-tosou': {
    slug: 'gaiheki-tosou',
    name: '外壁塗装',
    serviceType: '外壁塗装',
    lead: '下塗り・中塗り・上塗りの3回塗りを基本に、塗膜の防水・防汚機能を回復させます。',
    symptoms: ['チョーキング（白い粉）が出ている', '色あせ・ひび割れが目立つ', '築7〜10年でメンテナンス未実施'],
    priceFrom: '65万円〜（ウレタン・25坪・足場込・税抜）',
    image: '/images/stock/paint-supplies.jpg',
    imageAlt: '塗料の缶と刷毛、ローラー',
    imageIsStock: true,
    metaDescription:
      '茨城県阿見町の外壁塗装。完全自社施工で下塗り・中塗り・上塗りの3回塗り。チョーキングや色あせ、ひび割れの無料診断・お見積りはお気軽に。',
  },
  'yane-tosou': {
    slug: 'yane-tosou',
    name: '屋根塗装',
    serviceType: '屋根塗装',
    lead: '一年中、紫外線と雨風を最も受ける屋根。遮熱・防水性を高め、建物全体の寿命を延ばします。',
    symptoms: ['外壁と同時施工で足場代を共有できる', '色あせ・コケ・サビが出ている', '遮熱塗料で夏の室温対策にも'],
    priceFrom: '外壁との同時施工がおすすめ',
    image: '/images/stock/roof-tiles-sealing.jpg',
    imageAlt: '瓦屋根の上で、すき間に補修材を充てんしているところ',
    imageIsStock: true,
    imagePosition: '50% 50%',
    metaDescription:
      '茨城県阿見町の屋根塗装。遮熱・防水で建物の寿命を延ばします。外壁との同時施工で足場代を効率化。完全自社施工・無料診断。',
  },
  caulking: {
    slug: 'caulking',
    name: 'コーキング（シーリング）',
    serviceType: 'コーキング工事',
    lead: '外壁の目地やサッシ周りのゴム材を打ち替え・増し打ちし、雨水の侵入経路を塞ぎます。',
    symptoms: ['目地のひび割れ・肉やせ・剥離', 'サッシまわりの隙間', '塗装と同時に打ち替えるのが効果的'],
    priceFrom: '劣化箇所のみの対応も可能',
    image: '/images/stock/caulking-gun.jpg',
    imageAlt: 'コーキングガンからシーリング材を出しているところ',
    imageIsStock: true,
    imagePosition: '50% 50%',
    metaDescription:
      '茨城県阿見町のコーキング（シーリング）工事。目地・サッシ周りの打ち替え・増し打ちで雨水の侵入を防ぎます。完全自社施工・無料診断。',
  },
  bousui: {
    slug: 'bousui',
    name: '防水工事',
    serviceType: '防水工事',
    lead: 'ベランダ・屋上・バルコニーの防水層を再生。雨漏りが起きる前の予防が肝心です。',
    symptoms: ['床のひび割れ・水たまり', '過去に雨漏りの経験がある', '防水層の保護トップコート切れ'],
    priceFrom: '現地診断のうえご提案',
    image: '/images/stock/roof-waterproofing.jpg',
    imageAlt: '陸屋根に防水シートを張り終えたところ',
    imageIsStock: true,
    imagePosition: '50% 100%',
    metaDescription:
      '茨城県阿見町の防水工事。ベランダ・屋上・バルコニーの防水層を再生し、雨漏りを未然に防ぎます。完全自社施工・無料診断。',
  },
};

export const SERVICE_LIST = Object.values(SERVICES);
