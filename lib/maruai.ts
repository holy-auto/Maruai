export const MARUAI_IMAGES = {
  main: "https://public.readdy.ai/ai/img_res/e180f139-f68c-41a0-8451-e6b5fe97327d.png",
  thumbsUp: "https://public.readdy.ai/ai/img_res/3ec67620-cf3b-4ac8-8ac0-176fa9fe6ed2.png",
  pointing: "https://public.readdy.ai/ai/img_res/7884b395-8615-4127-ac60-38f288b36837.png",
  paint: "https://public.readdy.ai/ai/img_res/ec914c62-6104-4e23-9f9a-2da63b264e30.png",
  wave: "https://public.readdy.ai/ai/img_res/ed0d67ae-a700-4ac4-b033-6f4437102287.png",
};

export const MARUAI_COMMENTS = {
  hero: "阿見町の外壁・屋根塗装なら、丸愛装業にまるっとお任せください！",
  service: "外壁塗装・屋根塗装・コーキング・防水工事、全部自社で丁寧に施工しますよ！",
  simulation: "簡単に概算料金がわかります！訪問販売の高額見積もりと比べてみてくださいね！",
  result: "このプランでの概算料金はこちら！まずは無料の詳細見積もりを依頼してみてくださいね！",
  reason: "外壁のひび割れやカビ、白い粉がついてたら塗り替えのサインです！",
  message: "代表の小林が、お客様の大切なお家を真心込めてお守りします！",
  company: "株式会社丸愛装業は、阿見町で地域に密着した塗装会社です！",
  contact: "お気軽にご相談ください！LINEやお電話、メールからどうぞ！",
  examples: "実際の施工事例をご覧ください！ビフォーアフターの違いがすごいですよ！",
  cta: "まずは概算料金をチェックしてみませんか？",
};

export const MARUAI_RESULT_COMMENTS = [
  { max: 40, comment: "お手頃なプランですね！この品質でこの価格はかなりお得ですよ！", pose: "thumbsUp" as keyof typeof MARUAI_IMAGES },
  { max: 80, comment: "バランスの良いプランです！安心の品質とコスパを両立しています！", pose: "thumbsUp" as keyof typeof MARUAI_IMAGES },
  { max: 150, comment: "しっかりしたプランですね！高耐久で長く安心できる選択です！", pose: "pointing" as keyof typeof MARUAI_IMAGES },
  { max: 300, comment: "本格的なプランです！大規模物件でも安心の施工品質です！", pose: "pointing" as keyof typeof MARUAI_IMAGES },
  { max: Infinity, comment: "最高グレードの組み合わせです！これなら20年以上の安心が手に入りますよ！", pose: "paint" as keyof typeof MARUAI_IMAGES },
];

export const MARUAI_FLOATING_TIPS: Record<string, { comment: string; pose: keyof typeof MARUAI_IMAGES }[]> = {
  service: [
    { comment: "外壁塗装の目安は7〜10年周期！早めのメンテナンスが長持ちのコツですよ！", pose: "paint" },
    { comment: "屋根塗装に使う塗料は外壁とは別物！専用の高耐久塗料でしっかり守ります！", pose: "pointing" },
    { comment: "コーキングの劣化を見逃すと雨漏りの原因に！定期的なチェックが大事です！", pose: "main" },
    { comment: "防水工事でベランダや屋上の寿命がグッと伸びます！", pose: "paint" },
    { comment: "丸愛装業は完全自社施工！下請けに出さないから品質が違います！", pose: "thumbsUp" },
  ],
  reason: [
    { comment: "外壁に白い粉（チョーキング）が出てきたら塗膜劣化のサインです！", pose: "pointing" },
    { comment: "ひび割れを放置すると雨水が染み込み、内部の鉄筋が錆びちゃいます！", pose: "main" },
    { comment: "カビやコケは見た目だけじゃなく、アレルギーの原因になることも…！", pose: "main" },
    { comment: "7年以上メンテナンスしてないお家は、今すぐ診断がオススメです！", pose: "thumbsUp" },
    { comment: "火災保険の風災補償で外壁修理がおりるケースもあるんですよ！", pose: "wave" },
  ],
  message: [
    { comment: "代表の小林が、一件一件「真心」を込めて施工しています！", pose: "thumbsUp" },
    { comment: "「知り合いの塗装屋さん」が丸愛装業の目指す姿なんです！", pose: "main" },
    { comment: "完全自社施工だからこそできる、丁寧で正直な仕事があります！", pose: "thumbsUp" },
    { comment: "営業会社との違い、ぜひ代表メッセージでチェックしてみてください！", pose: "pointing" },
  ],
  company: [
    { comment: "阿見町・牛久市・土浦市エリアで施工中！お近くの方はぜひ！", pose: "thumbsUp" },
    { comment: "全国優良リフォーム会員として、安心の施工をお届けします！", pose: "main" },
    { comment: "公式LINE・Instagramでも情報発信中！お気軽にフォローを！", pose: "wave" },
    { comment: "60分以内に駆けつけられる距離限定！それが地域密着の証です！", pose: "thumbsUp" },
  ],
  contact: [
    { comment: "見積もりは完全無料！まずはお気軽にご依頼ください！", pose: "wave" },
    { comment: "電話でもLINEでも、お好きな方法でどうぞ！お待ちしてます！", pose: "thumbsUp" },
    { comment: "3営業日以内に必ずお返事します！お急ぎの方はお電話が早いです！", pose: "wave" },
    { comment: "どんな小さな疑問でもOK！塗装のプロがしっかりお答えします！", pose: "main" },
  ],
  examples: [
    { comment: "ビフォーアフターの違い、実物を見るとびっくりしますよ！", pose: "pointing" },
    { comment: "施工事例は定期的に更新中！ぜひチェックしてみてください！", pose: "thumbsUp" },
    { comment: "写真じゃ伝わらない質感もありますが、まずはイメージを！", pose: "main" },
  ],
  moneyflow: [
    { comment: "営業会社を通すと、職人に渡るお金は半分以下になることも…", pose: "pointing" },
    { comment: "中間マージンゼロ！お客様のお金が100%職人の手に届きます！", pose: "thumbsUp" },
    { comment: "完全自社施工だから、適正価格と高品質を両立できるんです！", pose: "main" },
    { comment: "職人が直接施工するから、手抜きなしの丁寧な仕事ができます！", pose: "paint" },
  ],
};

export const MARUAI_FLOATING_SIM_COMMENTS: { max: number; comment: string; pose: keyof typeof MARUAI_IMAGES }[] = [
  { max: 40, comment: "お手頃プラン！この品質でこの価格はかなりお得ですよ！", pose: "thumbsUp" },
  { max: 80, comment: "バランス良いですね！安心品質とコスパを両立してます！", pose: "thumbsUp" },
  { max: 150, comment: "しっかりしたプラン！高耐久で長く安心できる選択です！", pose: "pointing" },
  { max: 300, comment: "本格派！大規模でも安心の施工品質でお守りします！", pose: "pointing" },
  { max: Infinity, comment: "最高グレード！これなら20年以上の安心が手に入りますよ！", pose: "paint" },
];