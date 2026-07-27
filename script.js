/* =========================================================
   DEV.HUB — общий скрипт
   1) подсветка активной вкладки в шапке
   2) фильтры-чипы на страницах категорий
   3) генератор ФИО и ников (страница GEN)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. активная вкладка ---------- */
  const current = document.body.dataset.page;
  document.querySelectorAll('.tab').forEach(tab => {
    if (tab.dataset.page === current) tab.classList.add('is-active');
  });

  /* ---------- 2. фильтры-чипы + поиск (категория И текст) ---------- */
  const filterChips = document.querySelectorAll('[data-filter]');
  const filterables = document.querySelectorAll('[data-filter-item]');
  const searchInput = document.querySelector('[data-search]');
  const noResultsEl = document.querySelector('[data-no-results]');

  function applyFilters(){
    const activeChip = document.querySelector('[data-filter].is-active');
    const category = activeChip ? activeChip.dataset.filter : 'all';
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    let visibleCount = 0;

    filterables.forEach(item => {
      const types = (item.dataset.filterItem || '').split(' ');
      const matchesCategory = category === 'all' || types.includes(category);

      const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
      const desc = item.querySelector('p')?.textContent.toLowerCase() || '';
      const matchesSearch = !query || title.includes(query) || desc.includes(query);

      const show = matchesCategory && matchesSearch;
      item.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    if (noResultsEl){
      noResultsEl.classList.toggle('is-visible', visibleCount === 0);
    }
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      applyFilters();
    });
  });

  if (searchInput){
    searchInput.addEventListener('input', applyFilters);
  }

  if (filterChips.length || searchInput){
    applyFilters();
  }

  /* ---------- 3. генератор ФИО и ников ---------- */
  initFioGenerator();
  initNickGenerator();
});

/* ---- данные для генератора ФИО ---- */
const NAMES = {
  male: [
    'Александр', 'Дмитрий', 'Максим', 'Иван', 'Артём', 'Никита', 'Егор', 'Кирилл',
    'Тимофей', 'Роман', 'Сергей', 'Андрей', 'Алексей', 'Николай', 'Евгений', 'Михаил',
    'Константин', 'Денис', 'Олег', 'Валерий', 'Геннадий', 'Борис', 'Степан', 'Юрий',
    'Павел', 'Виктор', 'Владимир', 'Игорь', 'Антон', 'Арсений', 'Владислав', 'Илья',
    'Глеб', 'Фёдор', 'Виталий', 'Руслан', 'Вадим', 'Захар', 'Ярослав', 'Пётр',
    'Матвей', 'Святослав', 'Данил', 'Лев', 'Мирослав', 'Родион', 'Савелий', 'Вячеслав',
    'Эдуард', 'Герман', 'Аркадий', 'Ростислав', 'Игнат', 'Валентин', 'Анатолий', 'Семён',
    'Платон', 'Давид', 'Мирон', 'Тимур'
  ],
  female: [
    'Анастасия', 'Мария', 'Елена', 'Дарья', 'Полина', 'Виктория', 'Ксения', 'Алина',
    'София', 'Екатерина', 'Анна', 'Ольга', 'Наталья', 'Татьяна', 'Ирина', 'Светлана',
    'Юлия', 'Вероника', 'Софья', 'Валерия', 'Людмила', 'Надежда', 'Любовь', 'Галина',
    'Инна', 'Евгения', 'Диана', 'Арина', 'Милана', 'Алиса', 'Василиса', 'Карина',
    'Ангелина', 'Лилия', 'Алёна', 'Кристина', 'Марина', 'Зоя', 'Нина', 'Раиса',
    'Лариса', 'Тамара', 'Валентина', 'Оксана', 'Элина', 'Яна', 'Майя', 'Регина',
    'Нелли', 'Жанна', 'Алла', 'Маргарита', 'Снежана', 'Эвелина', 'Лидия', 'Таисия',
    'Ульяна', 'Варвара', 'Ева', 'Милена', 'Аделина', 'Александра', 'Дарина', 'Вера',
    'Ника', 'Кира'
  ]
};
const SURNAMES = {
  male: [
    'Иванов', 'Смирнов', 'Кузнецов', 'Соколов', 'Попов', 'Волков', 'Морозов', 'Новиков',
    'Фёдоров', 'Егоров', 'Петров', 'Лебедев', 'Козлов', 'Соловьёв', 'Васильев', 'Зайцев',
    'Павлов', 'Семёнов', 'Голубев', 'Виноградов', 'Богданов', 'Воробьёв', 'Михайлов', 'Белов',
    'Тарасов', 'Комаров', 'Орлов', 'Андреев', 'Николаев', 'Захаров', 'Борисов', 'Яковлев',
    'Григорьев', 'Романов', 'Степанов', 'Фролов', 'Алексеев', 'Максимов', 'Сергеев', 'Крылов',
    'Баранов', 'Жуков', 'Киселёв', 'Макаров', 'Гусев', 'Титов', 'Фомин', 'Давыдов',
    'Блинов', 'Цветков', 'Данилов', 'Ершов', 'Антонов', 'Афанасьев', 'Королёв', 'Жданов',
    'Чернов', 'Беляев', 'Калинин', 'Филиппов', 'Кондратьев', 'Мельников', 'Осипов', 'Ширяев',
    'Ушаков', 'Герасимов', 'Дементьев', 'Кудрявцев', 'Наумов', 'Архипов', 'Быков', 'Буров',
    'Гаврилов', 'Елисеев', 'Зотов', 'Ильин', 'Карпов', 'Логинов', 'Матвеев', 'Некрасов',
    'Одинцов', 'Прохоров', 'Родионов', 'Савельев', 'Терентьев', 'Уваров', 'Харитонов', 'Царёв',
    'Чистяков', 'Шестаков', 'Щербаков', 'Юдин', 'Яшин', 'Абрамов', 'Анисимов', 'Балашов',
    'Власов', 'Горшков', 'Дорофеев', 'Ефремов', 'Игнатов', 'Казаков', 'Лазарев', 'Миронов',
    'Нестеров', 'Овчинников', 'Панин', 'Рябов', 'Самсонов', 'Тимофеев', 'Устинов', 'Чернышёв',
    'Шубин', 'Щукин', 'Агафонов', 'Беспалов', 'Гордеев', 'Демидов', 'Ермаков', 'Зиновьев',
    'Исаков', 'Киреев', 'Лукин', 'Мартынов', 'Никитин', 'Пахомов', 'Рогов', 'Сафонов',
    'Трофимов', 'Филатов', 'Хохлов', 'Цыганов', 'Чесноков', 'Шаповалов', 'Щеглов', 'Юрьев',
    'Якушев', 'Авдеев', 'Бобров', 'Вишняков', 'Громов', 'Дьяков', 'Емельянов', 'Зорин',
    'Исаев', 'Колесников', 'Лапин', 'Медведев', 'Назаров', 'Орехов', 'Платонов', 'Рыбаков',
    'Субботин', 'Федосеев', 'Хромов', 'Черкасов', 'Широков', 'Юсупов', 'Аристов', 'Белкин',
    'Веденеев', 'Гончаров', 'Дьяченко', 'Ерохин', 'Жилин', 'Зеленин', 'Иванченко', 'Климов',
    'Малышев', 'Новосёлов', 'Осин', 'Пономарёв', 'Рудаков', 'Суханов', 'Туманов', 'Худяков',
    'Цветаев', 'Черепанов', 'Шмаков', 'Агеев', 'Баженов', 'Винокуров', 'Галкин', 'Добрынин',
    'Журавлёв', 'Зверев', 'Ипатов', 'Князев', 'Лосев', 'Мещеряков', 'Пронин', 'Романенко',
    'Селезнёв', 'Тихонов', 'Удалов', 'Хабаров', 'Чумаков', 'Шилов', 'Юров', 'Абросимов',
    'Гурьев', 'Дубинин', 'Ерёмин', 'Корнеев', 'Лобанов', 'Моисеев', 'Никифоров', 'Пугачёв',
    'Решетников', 'Сизов', 'Ульянов', 'Хомяков', 'Богомолов', 'Воронин', 'Гущин', 'Дёмин',
    'Ильинский', 'Котов', 'Ларионов', 'Макеев', 'Носов', 'Пестов', 'Рябинин', 'Сидоров',
    'Третьяков', 'Харламов', 'Шаров', 'Юрков', 'Яковенко', 'Авилов', 'Власенко', 'Дроздов',
    'Ермилов'
  ],
  female: [
    'Иванова', 'Смирнова', 'Кузнецова', 'Соколова', 'Попова', 'Волкова', 'Морозова', 'Новикова',
    'Фёдорова', 'Егорова', 'Петрова', 'Лебедева', 'Козлова', 'Соловьева', 'Васильева', 'Зайцева',
    'Павлова', 'Семенова', 'Голубева', 'Виноградова', 'Богданова', 'Воробьева', 'Федорова', 'Михайлова',
    'Белова', 'Тарасова', 'Комарова', 'Орлова', 'Андреева', 'Николаева', 'Захарова', 'Борисова',
    'Яковлева', 'Григорьева', 'Романова', 'Степанова', 'Фролова', 'Алексеева', 'Максимова', 'Сергеева',
    'Крылова', 'Баранова', 'Жукова', 'Киселева', 'Макарова', 'Гусева', 'Титова', 'Фомина',
    'Давыдова', 'Блинова', 'Цветкова', 'Данилова', 'Ершова', 'Антонова', 'Афанасьева', 'Королева',
    'Жданова', 'Чернова', 'Беляева', 'Калинина', 'Филиппова', 'Кондратьева', 'Мельникова', 'Осипова',
    'Ширяева', 'Ушакова', 'Герасимова', 'Дементьева', 'Кудрявцева', 'Наумова', 'Архипова', 'Быкова',
    'Бурова', 'Гаврилова', 'Елисеева', 'Зотова', 'Ильина', 'Карпова', 'Логинова', 'Матвеева',
    'Некрасова', 'Одинцова', 'Прохорова', 'Родионова', 'Савельева', 'Терентьева', 'Уварова', 'Харитонова',
    'Царева', 'Чистякова', 'Шестакова', 'Щербакова', 'Юдина', 'Яшина', 'Абрамова', 'Анисимова',
    'Балашова', 'Власова', 'Горшкова', 'Дорофеева', 'Ефремова', 'Игнатова', 'Казакова', 'Лазарева',
    'Миронова', 'Нестерова', 'Овчинникова', 'Панина', 'Рябова', 'Самсонова', 'Тимофеева', 'Устинова',
    'Чернышева', 'Шубина', 'Щукина', 'Яковенко', 'Агафонова', 'Беспалова', 'Гордеева', 'Демидова',
    'Ермакова', 'Зиновьева', 'Исакова', 'Киреева', 'Лукина', 'Мартынова', 'Никитина', 'Пахомова',
    'Рогова', 'Сафонова', 'Трофимова', 'Филатова', 'Хохлова', 'Цыганова', 'Чеснокова', 'Шаповалова',
    'Щеглова', 'Юрьева', 'Якушева', 'Авдеева', 'Боброва', 'Вишнякова', 'Громова', 'Дьякова',
    'Емельянова', 'Зорина', 'Исаева', 'Колесникова', 'Лапина', 'Медведева', 'Назарова', 'Орехова',
    'Платонова', 'Рыбакова', 'Субботина', 'Федосеева', 'Хромова', 'Черкасова', 'Широкова', 'Юсупова',
    'Аристова', 'Белкина', 'Веденеева', 'Гончарова', 'Дьяченко', 'Ерохина', 'Жилина', 'Зеленина',
    'Иванченко', 'Климова', 'Малышева', 'Новоселова', 'Осина', 'Пономарева', 'Рудакова', 'Суханова',
    'Туманова', 'Фролкина', 'Худякова', 'Цветаева', 'Черепанова', 'Шмакова', 'Агеева', 'Баженова',
    'Винокурова', 'Галкина', 'Добрынина', 'Журавлева', 'Зверева', 'Ипатова', 'Князева', 'Лосева',
    'Мещерякова', 'Пронина', 'Романенко', 'Селезнева', 'Тихонова', 'Удалова', 'Хабарова', 'Чумакова',
    'Шилова', 'Юрова', 'Абросимова', 'Гурьева', 'Дубинина', 'Еремина', 'Игнатьева', 'Корнеева',
    'Лобанова', 'Моисеева', 'Никифорова', 'Пугачева', 'Решетникова', 'Сизова', 'Ульянова', 'Хомякова',
    'Богомолова', 'Воронина', 'Гущина', 'Демина', 'Ильинская', 'Котова'
  ]
};
const PATRONYMICS = {
  male: [
    'Александрович', 'Дмитриевич', 'Сергеевич', 'Андреевич', 'Иванович', 'Николаевич', 'Викторович', 'Павлович',
    'Алексеевич', 'Владимирович', 'Игоревич', 'Евгеньевич', 'Максимович', 'Олегович', 'Валерьевич', 'Геннадьевич',
    'Юрьевич', 'Борисович', 'Степанович', 'Михайлович', 'Константинович', 'Артемович', 'Романович', 'Денисович'
  ],
  female: [
    'Александровна', 'Дмитриевна', 'Сергеевна', 'Андреевна', 'Ивановна', 'Николаевна', 'Викторовна', 'Павловна',
    'Алексеевна', 'Владимировна', 'Игоревна', 'Евгеньевна', 'Максимовна', 'Романовна', 'Олеговна', 'Валерьевна',
    'Константиновна', 'Артемовна', 'Денисовна', 'Михайловна', 'Геннадьевна', 'Юрьевна', 'Степановна', 'Борисовна',
    'Кирилловна', 'Витальевна'
  ]
};

function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

function currentGender(container){
  const active = container.querySelector('.chip.is-active');
  return active ? active.dataset.gender : 'male';
}

function initFioGenerator(){
  const panel = document.querySelector('[data-gen="fio"]');
  if (!panel) return;

  const options = panel.querySelector('.gen-options');
  const resultEl = panel.querySelector('.gen-result span');
  const generateBtn = panel.querySelector('.btn-primary');
  const copyBtn = panel.querySelector('.icon-btn');
  const historyList = panel.querySelector('.gen-history ul');

  options.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      options.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
    });
  });

  function generate(){
    const gender = currentGender(options);
    const fio = `${pick(SURNAMES[gender])} ${pick(NAMES[gender])} ${pick(PATRONYMICS[gender])}`;
    resultEl.textContent = fio;
    resultEl.classList.remove('is-empty');
    addHistory(historyList, fio);
  }

  generateBtn.addEventListener('click', generate);
  copyBtn.addEventListener('click', () => copyResult(resultEl, copyBtn));
}

/* ---- данные для генератора ников ---- */
const NICK_WORDS = ['Shadow', 'Nova', 'Cyber', 'Ghost', 'Storm', 'Frost', 'Pixel', 'Raven', 'Vortex', 'Neon', 'Blaze', 'Echo', 'Drift', 'Nomad', 'Rogue'];
const NICK_SUFFIX = ['X', 'Pro', 'Prime', 'One', 'Core', 'Zero', 'TV', 'RUS', ''];

function initNickGenerator(){
  const panel = document.querySelector('[data-gen="nick"]');
  if (!panel) return;

  const options = panel.querySelector('.gen-options');
  const resultEl = panel.querySelector('.gen-result span');
  const generateBtn = panel.querySelector('.btn-primary');
  const copyBtn = panel.querySelector('.icon-btn');
  const historyList = panel.querySelector('.gen-history ul');

  options.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      options.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
    });
  });

  function currentStyle(){
    const active = options.querySelector('.chip.is-active');
    return active ? active.dataset.style : 'word_number';
  }

  function generate(){
    const style = currentStyle();
    const word = pick(NICK_WORDS);
    const suffix = pick(NICK_SUFFIX);
    const number = Math.floor(Math.random() * 999);
    let nick = '';

    if (style === 'word_number') nick = `${word}${number}`;
    else if (style === 'word_word') nick = `${word}${pick(NICK_WORDS)}`;
    else if (style === 'underscored') nick = `${word.toLowerCase()}_${suffix.toLowerCase() || number}`;
    else nick = `${word}${suffix}`;

    resultEl.textContent = nick;
    resultEl.classList.remove('is-empty');
    addHistory(historyList, nick);
  }

  generateBtn.addEventListener('click', generate);
  copyBtn.addEventListener('click', () => copyResult(resultEl, copyBtn));
}

function addHistory(listEl, value){
  if (!listEl) return;
  const li = document.createElement('li');
  li.textContent = value;
  listEl.prepend(li);
  while (listEl.children.length > 5) listEl.removeChild(listEl.lastChild);
}

function copyResult(resultEl, btn){
  const text = resultEl.textContent;
  if (!text || resultEl.classList.contains('is-empty')) return;
  navigator.clipboard?.writeText(text).then(() => {
    const original = btn.innerHTML;
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
    setTimeout(() => { btn.innerHTML = original; }, 1200);
  });
}
