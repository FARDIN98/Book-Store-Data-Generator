import type { Language } from '../types';

export const LANGUAGES: Language[] = [
  {
    code: 'en-US',
    name: 'English',
    region: 'United States'
  },
  {
    code: 'de-DE',
    name: 'Deutsch',
    region: 'Deutschland'
  },
  {
    code: 'ja-JP',
    name: '日本語',
    region: '日本'
  },
  {
    code: 'fr-FR',
    name: 'Français',
    region: 'France'
  }
] as const;

// Book data for different languages
export const BOOK_DATA = {
  'en-US': {
    titles: [
      'The Silent Observer', 'Midnight in Manhattan', 'Digital Dreams', 'The Last Algorithm',
      'Stranger in New York', 'Bang!', '100 Things To Do With Cars', 'The Memory Keeper',
      'Shadows of Tomorrow', 'The Code Breaker', 'Urban Legends', 'The Time Traveler',
      'Lost in Translation', 'The Art of War', 'Modern Philosophy', 'The Great Escape',
      'Hidden Treasures', 'The Final Chapter', 'Beyond the Horizon', 'The Secret Garden',
      'Whispers in the Dark', 'The Golden Age', 'Future Shock', 'The Invisible Man',
      'The Perfect Storm', 'Digital Revolution', 'The Last Stand', 'Broken Dreams',
      'The Rising Sun', 'Eternal Sunshine', 'The Dark Knight', 'Silent Hill',
      'The Matrix', 'Blade Runner', 'Star Wars', 'The Godfather', 'Pulp Fiction',
      'Fight Club', 'The Shawshank Redemption', 'Forrest Gump', 'The Green Mile',
      'Saving Private Ryan', 'Titanic', 'Avatar', 'Inception', 'Interstellar',
      'The Dark Knight Rises', 'Batman Begins', 'Iron Man', 'The Avengers',
      'Captain America', 'Thor', 'Spider-Man', 'X-Men', 'Deadpool'
    ],
    firstNames: [
      'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa',
      'William', 'Jennifer', 'James', 'Mary', 'Christopher', 'Patricia', 'Daniel',
      'Linda', 'Matthew', 'Elizabeth', 'Anthony', 'Barbara', 'Mark', 'Susan',
      'Donald', 'Jessica', 'Steven', 'Karen', 'Paul', 'Nancy', 'Andrew', 'Betty',
      'Joshua', 'Helen', 'Kenneth', 'Sandra', 'Kevin', 'Donna', 'Brian', 'Carol',
      'George', 'Ruth', 'Timothy', 'Sharon', 'Ronald', 'Michelle', 'Jason', 'Laura',
      'Edward', 'Sarah', 'Jeffrey', 'Kimberly', 'Ryan', 'Deborah', 'Jacob', 'Dorothy'
    ],
    lastNames: [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
      'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
      'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
      'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
      'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen',
      'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera',
      'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans',
      'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes'
    ],
    publishers: [
      'Penguin Random House', 'HarperCollins', 'Macmillan Publishers', 'Simon & Schuster',
      'Hachette Book Group', 'Scholastic', 'Wiley', 'Pearson', 'McGraw-Hill',
      'Oxford University Press', 'Cambridge University Press', 'Springer', 'Elsevier',
      'Bloomsbury', 'Chronicle Books', 'Workman Publishing', 'Abrams Books',
      'Little, Brown and Company', 'Knopf Doubleday', 'Crown Publishing'
    ],
    reviewTexts: [
      'An absolutely captivating read that kept me turning pages late into the night.',
      'The author has crafted a masterpiece that will resonate with readers for years to come.',
      'A thought-provoking narrative that challenges conventional thinking.',
      'Beautifully written with characters that feel incredibly real and relatable.',
      'This book changed my perspective on life in the most unexpected ways.',
      'A gripping tale that seamlessly blends emotion with intellectual depth.',
      'The storytelling is exceptional, with every chapter building perfectly on the last.',
      'A must-read for anyone interested in contemporary literature.',
      "The author's unique voice shines through every page of this remarkable work.",
      'An engaging story that explores complex themes with remarkable clarity.'
    ]
  },
  'de-DE': {
    titles: [
      'Der stille Beobachter', 'Mitternacht in München', 'Digitale Träume', 'Der letzte Algorithmus',
      'Fremder in Berlin', 'Knall!', '100 Dinge mit Autos', 'Der Gedächtnishüter',
      'Schatten von Morgen', 'Der Code-Brecher', 'Stadtlegenden', 'Der Zeitreisende',
      'Verloren in der Übersetzung', 'Die Kunst des Krieges', 'Moderne Philosophie',
      'Die große Flucht', 'Verborgene Schätze', 'Das letzte Kapitel', 'Jenseits des Horizonts',
      'Der geheime Garten', 'Flüstern im Dunkeln', 'Das goldene Zeitalter', 'Zukunftsschock',
      'Der unsichtbare Mann', 'Der perfekte Sturm', 'Digitale Revolution', 'Der letzte Stand',
      'Zerbrochene Träume', 'Die aufgehende Sonne', 'Ewiger Sonnenschein'
    ],
    firstNames: [
      'Hans', 'Anna', 'Klaus', 'Maria', 'Wolfgang', 'Elisabeth', 'Helmut', 'Ingrid',
      'Günter', 'Ursula', 'Werner', 'Christa', 'Manfred', 'Gisela', 'Heinz', 'Renate',
      'Gerhard', 'Monika', 'Horst', 'Brigitte', 'Dieter', 'Sabine', 'Jürgen', 'Petra',
      'Rolf', 'Andrea', 'Uwe', 'Claudia', 'Frank', 'Martina', 'Bernd', 'Birgit',
      'Thomas', 'Susanne', 'Michael', 'Gabriele', 'Peter', 'Angelika', 'Stefan', 'Karin'
    ],
    lastNames: [
      'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker',
      'Schulz', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf',
      'Schröder', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun', 'Krüger', 'Hofmann',
      'Hartmann', 'Lange', 'Schmitt', 'Werner', 'Schmitz', 'Krause', 'Meier'
    ],
    publishers: [
      'Suhrkamp Verlag', 'Fischer Verlag', 'Hanser Verlag', 'Rowohlt Verlag',
      'Ullstein Verlag', 'Piper Verlag', 'Kiepenheuer & Witsch', 'Diogenes Verlag',
      'Aufbau Verlag', 'Luchterhand Verlag', 'Beck Verlag', 'Springer Verlag',
      'Thieme Verlag', 'Cornelsen Verlag', 'Klett Verlag'
    ],
    reviewTexts: [
      'Ein absolut fesselndes Buch, das mich bis spät in die Nacht wach gehalten hat.',
      'Der Autor hat ein Meisterwerk geschaffen, das noch Jahre nachwirken wird.',
      'Eine zum Nachdenken anregende Erzählung, die konventionelles Denken herausfordert.',
      'Wunderschön geschrieben mit Charakteren, die unglaublich real und nachvollziehbar wirken.',
      'Dieses Buch hat meine Lebensperspektive auf unerwartete Weise verändert.',
      'Eine packende Geschichte, die Emotion mit intellektueller Tiefe nahtlos verbindet.'
    ]
  },
  'ja-JP': {
    titles: [
      '静かな観察者', '真夜中の東京', 'デジタルドリーム', '最後のアルゴリズム',
      '東京の見知らぬ人', 'バン！', '車でできる100のこと', '記憶の番人',
      '明日の影', 'コードブレイカー', '都市伝説', 'タイムトラベラー',
      '翻訳で失われたもの', '戦争の芸術', '現代哲学', '大脱出',
      '隠された宝物', '最終章', '地平線の向こう', '秘密の庭',
      '闇のささやき', '黄金時代', 'フューチャーショック', '透明人間',
      '完璧な嵐', 'デジタル革命', '最後の抵抗', '壊れた夢'
    ],
    firstNames: [
      '太郎', '花子', '次郎', '美咲', '健太', 'さくら', '大輔', '由美',
      '翔太', '愛子', '拓也', '真理', '雄大', '恵子', '直樹', '智子',
      '和也', '裕子', '浩二', '典子', '秀樹', '洋子', '正人', '京子',
      '博之', '幸子', '昭夫', '節子', '清', '文子', '勇', '春子'
    ],
    lastNames: [
      '佐藤', '鈴木', '高橋', '田中', '渡辺', '伊藤', '山本', '中村',
      '小林', '加藤', '吉田', '山田', '佐々木', '山口', '松本', '井上',
      '木村', '林', '清水', '山崎', '森', '池田', '橋本', '阿部',
      '石川', '斎藤', '前田', '藤田', '後藤', '岡田'
    ],
    publishers: [
      '講談社', '小学館', '集英社', '新潮社', '文藝春秋', '角川書店',
      '岩波書店', '筑摩書房', '河出書房新社', '光文社', '中央公論新社',
      '東京創元社', '幻冬舎', '早川書房', '朝日新聞出版', '毎日新聞出版',
      '読売新聞社', '日本経済新聞出版', '東洋経済新報社', '青春出版社'
    ],
    reviewTexts: [
      '夜遅くまでページをめくり続けてしまう、絶対に魅力的な読み物です。',
      '作者は何年も心に響き続ける傑作を作り上げました。',
      '従来の考え方に挑戦する、考えさせられる物語です。',
      '信じられないほどリアルで共感できるキャラクターで美しく書かれています。',
      'この本は予想外の方法で私の人生観を変えました。',
      '感情と知的深さを見事に融合させた魅力的な物語です。'
    ]
  },
  'fr-FR': {
    titles: [
      "L'observateur silencieux", 'Minuit à Paris', 'Rêves numériques', 'Le dernier algorithme',
      'Marseille et la dame rose', 'La librairie des livres interdits', "Il suffit parfois d'un été",
      'Le Bleu', 'Bisous', 'La grand arbre', 'Étranger à Paris', 'Bang!',
      '100 choses à faire avec des voitures', 'Le gardien de la mémoire',
      'Ombres de demain', 'Le briseur de codes', 'Légendes urbaines', 'Le voyageur du temps',
      'Perdu dans la traduction', "L'art de la guerre", 'Philosophie moderne',
      'La grande évasion', 'Trésors cachés', 'Le dernier chapitre'
    ],
    firstNames: [
      'Pierre', 'Marie', 'Jean', 'Françoise', 'Michel', 'Monique', 'Alain', 'Catherine',
      'Philippe', 'Sylvie', 'Bernard', 'Martine', 'Christian', 'Nicole', 'Daniel', 'Isabelle',
      'Patrick', 'Nathalie', 'François', 'Chantal', 'Gérard', 'Brigitte', 'André', 'Véronique',
      'Robert', 'Christine', 'Henri', 'Jacqueline', 'Claude', 'Dominique', 'Jacques', 'Maribel',
      'Capicine', 'Jaques', 'Lily-Belle', 'Guy', 'Julie'
    ],
    lastNames: [
      'Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand', 'Dubois',
      'Moreau', 'Laurent', 'Simon', 'Michel', 'Lefebvre', 'Leroy', 'Roux', 'David',
      'Bertrand', 'Morel', 'Fournier', 'Girard', 'Bonnet', 'Dupont', 'Lambert', 'Fontaine',
      'Rousseau', 'Vincent', 'Muller', 'Lefevre', 'Faure', 'Andre', 'Shiras', 'Semeaux',
      'Albane Abelard', 'de Shiraz', 'de Lavrous', 'Vernes'
    ],
    publishers: [
      'Gallimard', 'Hachette', 'Flammarion', 'Seuil', 'Albin Michel', 'Grasset',
      'Fayard', 'Calmann-Lévy', 'Robert Laffont', 'Plon', 'Éditions du Rocher',
      'Belfond', 'Lattès', 'Stock', 'Julliard'
    ],
    reviewTexts: [
      "Une lecture absolument captivante qui m'a tenu éveillé tard dans la nuit.",
      "L'auteur a créé un chef-d'œuvre qui résonnera avec les lecteurs pendant des années.",
      'Un récit qui fait réfléchir et remet en question la pensée conventionnelle.',
      'Magnifiquement écrit avec des personnages incroyablement réels et attachants.',
      'Ce livre a changé ma perspective sur la vie de manière inattendue.',
      'Une histoire captivante qui mélange parfaitement émotion et profondeur intellectuelle.'
    ]
  }
};