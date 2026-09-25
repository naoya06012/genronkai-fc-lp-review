// 確認用：9/25 FC定例で共有する。v23→v24（中山さんの訂正 2026-09-24 Slack）と v24→v25（FV・フッター）で何を直したかをページ内に表示する
(function () {
  const TAGS = {
    ok: ['指示どおり', 'rvk-ok'],
    fill: ['指示から補った', 'rvk-fill'],
    ask: ['確認したい', 'rvk-ask'],
  };

  // mark: 点線で囲む要素 / at: メモを置く位置 / pos: after（既定）| append
  // title: 何をしたか1行 / src: 中山さんの該当部分 / before→after / ask: 確認したいこと（任意）
  // v: 'v25' のメモは見出しに「v25」と出し、出典の前置きを「大橋」にする（既定は v24・中山さん）
  const NOTES = [
    {
      v: 'v25', mark: ['.hero'], at: '.hero', tag: 'ok',
      title: 'FV右下の「オーナーの働き方を表現したイメージ」を削除',
      src: '9/25 FV右下の画像注記を消す',
      before: 'オーナーの働き方を表現したイメージ', after: '（削除）',
    },
    {
      mark: ['.introline p'], at: '.introline', tag: 'ok',
      title: '校舎数を69→71に',
      src: 'p1 リード 全国に69校舎 ／ 実際 71校',
      before: '全国に69校舎', after: '全国に71校舎',
    },
    {
      mark: ['.role-frequency-note'], at: '.role-overview', tag: 'fill',
      title: '教室長の説明に注釈を1行足した（本文は元のまま）',
      src: '「週2〜3日」…「生徒が増えれば教室長の勤務も報酬も増える」と書いたほうが',
      before: '週2〜3日の勤務です。', after: '週2〜3日の勤務です。※勤務・報酬は、生徒数に応じて変動します。',
    },
    {
      mark: ['.cost-table-frame'], at: '.monthly-comparison', tag: 'ok',
      title: '月額費用を改定後の数字に（合計36万→37.1万）',
      src: '教室長 固定4万は廃止…8名で48,240円 ／ 広告費を集客広告7.5万＋本部広告分担金2.75万に分解 ／ 合計 約37.1万円',
      before: '教室長 4万 ／ 広告費 10万 ／ 合計 36万', after: '教室長 4.8万（8名時） ／ 集客広告費 7.5万 ／ 本部広告分担金 2.75万 ／ 合計 37.1万',
    },
    {
      mark: ['.colnote'], at: '.colnote', tag: 'ok',
      title: '表の注記から「システム利用料」を削除',
      src: 'システム利用料は2027年1月で廃止…この1語が残っていると「まだ取られるのか」と読まれる',
      before: '…コーチ人件費・ロイヤリティ・システム利用料は別途', after: '…本部広告分担金は年33万円（税込）の月割りで、2年目から。コーチ人件費・ロイヤリティは別途',
    },
    {
      mark: ['.bep-formula'], at: '.bep-formula', tag: 'ok',
      title: '損益分岐の計算式を差し替え（結論の8名は同じ）',
      src: '370,740円 ÷ 48,208円 ＝ 7.7名 → 在籍8名',
      before: '36万円 ÷ 48,300円 → 8名', after: '370,740円 ÷ 48,208円 → 8名',
    },
    {
      mark: ['.gross-explanation'], at: '.gross-explanation', tag: 'ok',
      title: '粗利の説明から「システム利用料」を削除',
      src: '「粗利は…システム利用料を引いた残り」→ システム利用料を削除',
      before: 'コーチ人件費・ロイヤリティ・システム利用料を引いた残り', after: 'コーチ人件費・ロイヤリティを引いた残り',
    },
    {
      mark: ['#economics .fclp-inner > p.model-note'], at: '#economics .fclp-inner > p.model-note', tag: 'ok',
      title: '「免税事業者を前提」の注記をカット',
      src: '「※現行料金・免税事業者を前提としたモデル」→ ここが一番危ない。カット ／ 課税事業者になると粗利は48,208→約45,200円',
      before: '※現行料金・免税事業者を前提としたモデル。粗利48,300円は…', after: '（カット）',
    },
    {
      mark: ['#quality .pbar.own', '#quality .pdelta', '#quality .pcap'], at: '#quality .pcap', tag: 'ok',
      title: '保護者の年間費用を約80万→約85万に',
      src: '66,600円×12＋入会金55,000＝854,200円 ≒ 約85万円、差は35〜65万円。「月謝6万円」も要修正',
      before: '約80万円 ／ 差 40〜70万円 ／ 月謝6万円の12ヶ月分', after: '約85万円 ／ 差 35〜65万円 ／ 平均月謝（約6.6万円）の12ヶ月分',
    },
    {
      mark: ['.profit-cohort', '.results-note'], at: '.results-note', tag: 'fill',
      title: '「FC累計開校」を言い換え（数字60はそのまま）',
      src: 'p6 FC累計開校 60教室（これは合ってますが、FCの累計開校がわかりにくい？）',
      before: 'FC累計開校 60教室のうち', after: 'これまでに開校したFC 60教室のうち',
    },
    {
      mark: ['#cost > .fclp-inner > .fclp-lead', '.funding-prelaunch', '.funding-operating:not(.funding-prelaunch)'], at: '.funding-overview', tag: 'ok',
      title: '開校費用を3つに分けた（集客費100万を新設・運転資金を250〜400万に）',
      src: '開校費用 500〜660万 ＋ 開校前の集客費 100万 ＋ 運転資金 250〜400万。運転資金の注記も差し替え',
      before: '開校費用 500〜660万 ＋ 運転資金 250〜300万', after: '開校費用 500〜660万 ＋ 開校前の集客費 100万 ＋ 運転資金 250〜400万',
    },
    {
      mark: ['.funding-model'], at: '.funding-overview', tag: 'ok',
      title: 'モデルケースを追加（見出しの「自己資金150万円から」はそのまま）',
      src: 'モデルケース 総額 1,150万 ／ 自己資金 200万 ／ 融資 950万',
      before: '（なし）', after: '総額1,150万円＝自己資金200万円＋融資950万円',
    },
    {
      mark: ['#cost .csl .csr:first-child'], at: '#cost .csl', tag: 'ask',
      title: '加盟金の「初年度広告費」と「開校前の集客費100万」の関係',
      src: '（中山さんの指摘外。開校費用を3つに分けたので確認）',
      before: '—', after: '—',
      ask: '「開校前の集客費100万円」は、加盟金300万円に含まれる初年度広告費のことを指している、という認識でよいか。',
    },
    {
      mark: ['#cost .cmpcap'], at: '#cost .cmpcap', tag: 'fill',
      title: '「一般的な学習塾FC 700〜1,000万」に算出方法を1行追加',
      src: 'p9 算出方法を一行（社名は不要）',
      before: '他塾は公開情報にもとづく参考値', after: '大手学習塾フランチャイズの公開情報（加盟金・研修費・物件取得・備品などの合計）をもとにした参考値',
    },
    {
      mark: ['.csfee .f:nth-child(2)'], at: '.csfee', tag: 'ok',
      title: '年間広告費を30万→33万（税込）に',
      src: '年間広告費「30万円」→ 33万円（税込）',
      before: '30万円', after: '33万円（税込）',
    },
    {
      mark: ['.csnote'], at: '.csnote', tag: 'fill',
      title: '税抜・税込の書き方を直した',
      src: '「加盟金100万円は税込330万円」は誤記。300万→税込330万',
      before: '本部費用は税抜です（加盟金300万円は税込330万円）', after: '加盟金は税抜です（加盟金300万円は税込330万円）。年間広告費33万円は税込です',
      memo: '指摘の誤記はv23では既に「300万円」で正しかった。年間広告費だけ税込になったので、注記を書き分けた。',
    },
    {
      mark: ['.proof .pf'], at: '.proof', tag: 'ok',
      title: '校舎数を「FC 60校以上」→「全国71校舎」に',
      src: 'p8 全国60校以上 ／ 実際 71校',
      before: 'いまはFC校舎が全国60校以上', after: 'いまは全国71校舎',
    },
    {
      mark: ['#faq details:first-of-type .a2'], at: '#faq details:first-of-type', pos: 'append', tag: 'ok',
      title: '副業FAQを中山さんの本命案に差し替え',
      src: '「就業規則の確認が前提」を先に置き、事例は後に（修正案・本命）',
      before: '就業規則の内容によって扱いが変わる部分です。実際に、会社に在籍したまま…契約できる形の整理を…', after: 'まず、ご自身の就業規則をご確認ください。…就業規則を確認したうえで開校されたオーナーもいます。…',
    },
    {
      mark: ['.unit-appendix'], at: '.unit-appendix', tag: 'ask',
      title: '補足の「月謝66,000円・4.4倍」は改定前の数字のまま',
      src: '（中山さんの指摘外）',
      before: '—', after: '—',
      ask: '改定後の料金に合わせて直すか。「2026年12月までのモデル条件」という書き方も残っている。',
    },
    {
      mark: ['.footer-company'], at: '.site-footer', pos: 'append', tag: 'ok',
      title: 'フッターに運営会社と所在地を追加',
      src: 'p12 フッター — 運営会社名・所在地・問い合わせ先がありません',
      before: '（なし）', after: '株式会社言楽舎 ／ 東京都新宿区西新宿7-4-7 第一太田ビル5階',
    },
    {
      v: 'v25', mark: ['.footer-links'], at: '.site-footer', pos: 'append', tag: 'ok',
      title: 'フッターに「企業情報」「プライバシーポリシー」のリンクを追加',
      src: '9/25 フッターに2つのリンクを追加（現論会サイトの既存ページへ）',
      before: '（なし）', after: '企業情報 → genronkai.com/company-profile/ ／ プライバシーポリシー → genronkai.com/privacy-policy/',
    },
  ];

  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const counts = {};
  NOTES.forEach((note) => {
    const at = document.querySelector(note.at);
    if (!at) { console.warn('[review] 見つからない:', note.at); return; }
    counts[note.tag] = (counts[note.tag] || 0) + 1;
    note.mark.forEach((sel) => document.querySelectorAll(sel).forEach((el) => el.classList.add('rvk-mark', TAGS[note.tag][1])));
    const box = document.createElement('aside');
    box.className = 'rvk-note ' + TAGS[note.tag][1];
    const diff = note.before === '—' ? '' :
      `<p class="rvk-diff"><s>${esc(note.before)}</s><span class="rvk-arrow">→</span><ins>${esc(note.after)}</ins></p>`;
    box.innerHTML = `<p class="rvk-head"><b class="rvk-no"></b>${note.v ? `<span class="rvk-tag rvk-v">${note.v}</span>` : ''}<span class="rvk-tag">${TAGS[note.tag][0]}</span><b class="rvk-title">${esc(note.title)}</b></p>` +
      diff +
      (note.ask ? `<p class="rvk-q">${esc(note.ask)}</p>` : '') +
      (note.memo ? `<p class="rvk-memo">${esc(note.memo)}</p>` : '') +
      `<p class="rvk-src">${note.v ? '大橋' : '中山さん'}：${esc(note.src)}</p>`;
    if (note.pos === 'append') at.appendChild(box);
    else { let ref = at; while (ref.nextElementSibling && ref.nextElementSibling.classList.contains('rvk-note')) ref = ref.nextElementSibling; ref.after(box); }
  });

  const boxes = document.querySelectorAll('.rvk-note');
  boxes.forEach((box, i) => { box.id = 'rvk-' + (i + 1); box.querySelector('.rvk-no').textContent = i + 1; });

  const vCount = document.querySelectorAll('.rvk-v').length;
  const bar = document.createElement('div');
  bar.className = 'rvk-bar';
  bar.innerHTML = `<p><b>確認用（9/25 FC定例）</b> 修正 ${boxes.length}件＝中山さんの訂正 ${boxes.length - vCount}件＋v25 ${vCount}件（点線＝直した箇所）</p>` +
    `<p class="rvk-legend">${Object.entries(TAGS).map(([k, [label, cls]]) => `<span class="rvk-tag ${cls}">${label} ${counts[k] || 0}</span>`).join('')}</p>` +
    `<button type="button">メモを隠す</button>`;
  document.body.prepend(bar);
  bar.querySelector('button').addEventListener('click', (e) => {
    const off = document.body.classList.toggle('rvk-off');
    e.target.textContent = off ? 'メモを表示' : 'メモを隠す';
  });
})();
