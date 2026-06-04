const MS_PER_DAY = 24 * 60 * 60 * 1000;
const TZ = "Asia/Vladivostok";
const STORAGE_KEY = "club-cleanliness-control-v1";

const headers = [
  "ID",
  "Активна",
  "Зона",
  "Задача",
  "Описание",
  "Смена",
  "Периодичность",
  "Каждые N дней",
  "Срок/время",
  "Приоритет",
  "Фото/подтверждение",
  "Инвентарь",
  "Стандарт выполнения",
  "Дата старта",
  "Комментарий",
];

const seedTasks = [
  {
    id: "CLN-001",
    active: true,
    zone: "Зал ПК",
    title: "Влажная уборка всех столов",
    description: "Протереть все свободные и освободившиеся столы, убрать пыль, крошки и липкие следы.",
    shift: "Обе",
    frequency: "Каждый день",
    intervalDays: 1,
    dueTime: "11:00",
    priority: "Высокий",
    evidence: "Нет",
    supplies: "Микрофибра, средство для столов",
    standard: "На столах нет пыли, крошек, пятен и мусора.",
    startDate: "2026-06-04",
    comment: "Базовая ежедневная задача.",
  },
  {
    id: "CLN-002",
    active: true,
    zone: "Зал ПК",
    title: "Мониторы без пыли и следов",
    description: "Аккуратно протереть экраны сухой/специальной микрофиброй и средством для экранов.",
    shift: "Обе",
    frequency: "Каждый день",
    intervalDays: 1,
    dueTime: "12:00",
    priority: "Высокий",
    evidence: "Нет",
    supplies: "Микрофибра для экранов",
    standard: "Экраны чистые, без разводов и отпечатков.",
    startDate: "2026-06-04",
    comment: "Не использовать агрессивную химию.",
  },
  {
    id: "CLN-003",
    active: true,
    zone: "Зал ПК",
    title: "Контроль чистоты кресел",
    description: "Протереть подлокотники, сиденья, спинки; убрать крошки и поправить положение кресел.",
    shift: "Обе",
    frequency: "Каждый день",
    intervalDays: 1,
    dueTime: "15:00",
    priority: "Средний",
    evidence: "Нет",
    supplies: "Салфетки, средство для поверхностей",
    standard: "Кресла ровно стоят, нет крошек и видимых загрязнений.",
    startDate: "2026-06-04",
    comment: "",
  },
  {
    id: "CLN-004",
    active: true,
    zone: "Вход",
    title: "Стекла на входе",
    description: "Протереть входные стекла и ручки, убрать отпечатки.",
    shift: "Дневная",
    frequency: "Каждый день",
    intervalDays: 1,
    dueTime: "13:00",
    priority: "Средний",
    evidence: "Нет",
    supplies: "Средство для стекол",
    standard: "На стеклах нет заметных следов рук и разводов.",
    startDate: "2026-06-04",
    comment: "",
  },
  {
    id: "CLN-005",
    active: true,
    zone: "Холодильники",
    title: "Стекла холодильников",
    description: "Протереть фасады холодильников, ручки и видимые полки.",
    shift: "Дневная",
    frequency: "Каждый день",
    intervalDays: 1,
    dueTime: "14:00",
    priority: "Средний",
    evidence: "Нет",
    supplies: "Средство для стекол, микрофибра",
    standard: "Стекла чистые, товар виден, ручки не липкие.",
    startDate: "2026-06-04",
    comment: "",
  },
  {
    id: "CLN-006",
    active: true,
    zone: "Санузел",
    title: "Санузел: чистота и запах",
    description: "Проверить пол, зеркало, раковину, унитаз, мусор, запах.",
    shift: "Обе",
    frequency: "Каждая смена",
    intervalDays: 1,
    dueTime: "Каждые 3 часа",
    priority: "Критичный",
    evidence: "При проблеме",
    supplies: "Перчатки, чистящие средства",
    standard: "Санузел чистый, мусор не переполнен, запах нейтральный.",
    startDate: "2026-06-04",
    comment: "Отмечать проблему, если нужна помощь или ремонт.",
  },
  {
    id: "CLN-007",
    active: true,
    zone: "Санузел",
    title: "Расходники санузла",
    description: "Проверить мыло, туалетную бумагу и сухие рулоны/полотенца для рук.",
    shift: "Обе",
    frequency: "Каждая смена",
    intervalDays: 1,
    dueTime: "Начало и конец",
    priority: "Критичный",
    evidence: "При проблеме",
    supplies: "Запас мыла, бумаги, рулонов",
    standard: "Все расходники есть с запасом до следующей проверки.",
    startDate: "2026-06-04",
    comment: "",
  },
  {
    id: "CLN-008",
    active: true,
    zone: "Логово",
    title: "Пылесос ковра в логове",
    description: "Пропылесосить ковер, особенно под столами и возле кресел.",
    shift: "Ночная",
    frequency: "Через день",
    intervalDays: 2,
    dueTime: "03:00",
    priority: "Средний",
    evidence: "Нет",
    supplies: "Пылесос",
    standard: "На ковре нет крошек, мусора и заметной пыли.",
    startDate: "2026-06-04",
    comment: "Если была компания с едой, выполнить вне графика.",
  },
  {
    id: "CLN-009",
    active: true,
    zone: "Зона питания",
    title: "Пылесос ковра в зоне питания",
    description: "Пропылесосить ковер/пол в зоне питания, убрать крошки под столом.",
    shift: "Ночная",
    frequency: "Через день",
    intervalDays: 2,
    dueTime: "03:30",
    priority: "Средний",
    evidence: "Нет",
    supplies: "Пылесос",
    standard: "Зона питания без крошек и мусора.",
    startDate: "2026-06-04",
    comment: "",
  },
  {
    id: "CLN-010",
    active: true,
    zone: "ПК",
    title: "Пылесос сеток на ПК",
    description: "Аккуратно пропылесосить внешние сетки/фильтры корпусов ПК без разборки.",
    shift: "Ночная",
    frequency: "Каждые 2 дня",
    intervalDays: 2,
    dueTime: "04:00",
    priority: "Высокий",
    evidence: "При проблеме",
    supplies: "Пылесос, мягкая насадка",
    standard: "Сетки не забиты пылью, поток воздуха не перекрыт.",
    startDate: "2026-06-04",
    comment: "Не дергать провода и не разбирать корпус без разрешения.",
  },
  {
    id: "CLN-011",
    active: true,
    zone: "Периферия",
    title: "Быстрая чистота мышек и наушников",
    description: "После гостя протереть мышку, амбушюры/дужки наушников и убрать видимые загрязнения.",
    shift: "Обе",
    frequency: "После каждого гостя",
    intervalDays: 0,
    dueTime: "После гостя",
    priority: "Средний",
    evidence: "Нет",
    supplies: "Дезинфицирующие салфетки",
    standard: "Периферия не липкая, без мусора и видимых следов.",
    startDate: "2026-06-04",
    comment: "Эта задача показывается в обе смены как постоянное правило.",
  },
  {
    id: "CLN-012",
    active: true,
    zone: "Периферия",
    title: "Глубокая чистка клавиатур",
    description: "Продуть и протереть клавиатуры, убрать крошки между клавишами.",
    shift: "Ночная",
    frequency: "Раз в 3 недели",
    intervalDays: 21,
    dueTime: "05:00",
    priority: "Средний",
    evidence: "Да",
    supplies: "Сжатый воздух, кисть, салфетки",
    standard: "Клавиатуры чистые визуально и между клавишами.",
    startDate: "2026-06-04",
    comment: "Можно делить по зонам, если клавиатур много.",
  },
  {
    id: "CLN-013",
    active: true,
    zone: "Ресепшен",
    title: "Рабочая зона администратора",
    description: "Протереть ресепшен, терминал, рабочие мониторы, убрать личные вещи и лишние чеки.",
    shift: "Обе",
    frequency: "Каждая смена",
    intervalDays: 1,
    dueTime: "Начало смены",
    priority: "Средний",
    evidence: "Нет",
    supplies: "Микрофибра, салфетки",
    standard: "Рабочая зона выглядит аккуратно для гостя.",
    startDate: "2026-06-04",
    comment: "",
  },
  {
    id: "CLN-014",
    active: true,
    zone: "Зал ПК",
    title: "Обход чистоты клуба",
    description: "Пройти весь клуб: мусор, пустые банки, запахи, пыль, занятые и свободные места.",
    shift: "Обе",
    frequency: "Каждая смена",
    intervalDays: 1,
    dueTime: "Каждые 3-4 часа",
    priority: "Высокий",
    evidence: "При проблеме",
    supplies: "Пакеты для мусора, салфетки",
    standard: "Нет очевидного мусора, зоны выглядят под контролем.",
    startDate: "2026-06-04",
    comment: "Использовать правило 20% загруженности: концентрировать гостей в активных зонах.",
  },
  {
    id: "CLN-015",
    active: true,
    zone: "Передача смены",
    title: "Передача проблем следующей смене",
    description: "Записать нерешенные проблемы по чистоте, технике, расходникам и гостям.",
    shift: "Обе",
    frequency: "Каждая смена",
    intervalDays: 1,
    dueTime: "Конец смены",
    priority: "Высокий",
    evidence: "Нет",
    supplies: "Комментарий в системе",
    standard: "Следующая смена понимает, что осталось сделать.",
    startDate: "2026-06-04",
    comment: "",
  },
];

const elements = {};
const state = {
  tasks: seedTasks,
  completions: {},
  selectedTaskId: null,
  shiftDate: "",
  shift: "Дневная",
  zone: "all",
  search: "",
  problemOnly: false,
  scriptUrl: "",
  employee: "",
  source: "Встроенный шаблон",
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  bindElements();
  const saved = loadStoredState();
  Object.assign(state, saved);

  const shiftInfo = getCurrentShiftInfo();
  state.shiftDate = state.shiftDate || shiftInfo.date;
  state.shift = state.shift || shiftInfo.shift;

  elements.shiftDate.value = state.shiftDate;
  elements.scriptUrl.value = state.scriptUrl || "";
  elements.employeeName.value = state.employee || "";
  elements.problemOnly.checked = state.problemOnly;

  bindEvents();
  renderAll();
}

function bindElements() {
  for (const id of [
    "sourceLabel",
    "shiftDate",
    "dayShift",
    "nightShift",
    "doneKpi",
    "progressKpi",
    "problemKpi",
    "overdueKpi",
    "nextTaskKpi",
    "nextTaskTime",
    "searchInput",
    "zoneFilter",
    "problemOnly",
    "resetShift",
    "exportLog",
    "taskList",
    "detailZone",
    "detailPriority",
    "detailTitle",
    "detailDescription",
    "detailFrequency",
    "detailDue",
    "detailEvidence",
    "detailSupplies",
    "detailStandard",
    "employeeName",
    "taskNote",
    "evidenceUrl",
    "markDone",
    "markProblem",
    "markNotRequired",
    "scriptUrl",
    "saveSync",
    "syncNow",
    "syncStatus",
    "fileInput",
    "loadBundledTemplate",
    "downloadCsvTemplate",
    "exportTasks",
  ]) {
    elements[id] = document.getElementById(id);
  }
}

function bindEvents() {
  elements.shiftDate.addEventListener("change", () => {
    state.shiftDate = elements.shiftDate.value;
    saveStoredState();
    renderAll();
  });

  elements.dayShift.addEventListener("click", () => setShift("Дневная"));
  elements.nightShift.addEventListener("click", () => setShift("Ночная"));

  elements.searchInput.addEventListener("input", () => {
    state.search = elements.searchInput.value.trim().toLowerCase();
    renderTasks();
  });

  elements.zoneFilter.addEventListener("change", () => {
    state.zone = elements.zoneFilter.value;
    saveStoredState();
    renderTasks();
  });

  elements.problemOnly.addEventListener("change", () => {
    state.problemOnly = elements.problemOnly.checked;
    saveStoredState();
    renderTasks();
  });

  elements.taskList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const id = button.dataset.id;
    if (!id) return;
    if (button.dataset.action === "toggle") {
      const completion = getCompletion(id);
      const nextStatus = completion?.status === "Готово" ? "Не выполнено" : "Готово";
      markTask(id, nextStatus);
      return;
    }
    if (button.dataset.action === "select") {
      state.selectedTaskId = id;
      renderAll();
    }
  });

  elements.employeeName.addEventListener("input", () => {
    state.employee = elements.employeeName.value.trim();
    saveStoredState();
  });

  elements.markDone.addEventListener("click", () => markSelected("Готово"));
  elements.markProblem.addEventListener("click", () => markSelected("Проблема"));
  elements.markNotRequired.addEventListener("click", () => markSelected("Не требуется"));

  elements.resetShift.addEventListener("click", () => {
    const ok = window.confirm("Сбросить отметки выбранной даты и смены?");
    if (!ok) return;
    const prefix = `${state.shiftDate}|${state.shift}|`;
    for (const key of Object.keys(state.completions)) {
      if (key.startsWith(prefix)) delete state.completions[key];
    }
    saveStoredState();
    renderAll();
  });

  elements.exportLog.addEventListener("click", exportCurrentShiftLog);
  elements.exportTasks.addEventListener("click", () => downloadCsv("zadachi_chistoty.csv", rowsToCsv(tasksToRows(state.tasks))));
  elements.downloadCsvTemplate.addEventListener("click", () => downloadCsv("shablon_zadach_chistoty.csv", rowsToCsv(tasksToRows(seedTasks))));

  elements.fileInput.addEventListener("change", handleFileImport);
  elements.loadBundledTemplate.addEventListener("click", loadBundledTemplate);

  elements.saveSync.addEventListener("click", () => {
    state.scriptUrl = elements.scriptUrl.value.trim();
    saveStoredState();
    setSyncStatus(state.scriptUrl ? "URL сохранен. Можно синхронизировать." : "Синхронизация не подключена.", state.scriptUrl ? "ok" : "");
  });

  elements.syncNow.addEventListener("click", syncNow);
}

function loadBundledTemplate() {
  state.tasks = [...seedTasks];
  state.source = "Встроенный шаблон";
  state.selectedTaskId = null;
  saveStoredState();
  renderAll();
  setSyncStatus(`Базовый шаблон загружен. Задач: ${state.tasks.length}.`, "ok");
}

function setShift(shift) {
  state.shift = shift;
  saveStoredState();
  renderAll();
}

function renderAll() {
  ensureSelectedTask();
  renderShiftControls();
  renderZoneFilter();
  renderTasks();
  renderDetail();
  renderKpis();
  elements.sourceLabel.textContent = state.source;
}

function ensureSelectedTask() {
  const due = getVisibleBaseTasks();
  if (!due.some((task) => task.id === state.selectedTaskId)) {
    state.selectedTaskId = due[0]?.id || null;
  }
}

function renderShiftControls() {
  elements.shiftDate.value = state.shiftDate;
  elements.dayShift.classList.toggle("active", state.shift === "Дневная");
  elements.nightShift.classList.toggle("active", state.shift === "Ночная");
}

function renderZoneFilter() {
  const zones = ["all", ...new Set(getVisibleBaseTasks().map((task) => task.zone).filter(Boolean))];
  if (!zones.includes(state.zone)) state.zone = "all";
  elements.zoneFilter.innerHTML = zones
    .map((zone) => `<option value="${escapeAttr(zone)}">${zone === "all" ? "Все зоны" : escapeHtml(zone)}</option>`)
    .join("");
  elements.zoneFilter.value = state.zone;
}

function renderTasks() {
  const tasks = getFilteredTasks();
  if (!tasks.length) {
    elements.taskList.innerHTML = `<div class="empty-state">На выбранную дату и смену задач нет. Проверьте фильтры или дату старта в шаблоне.</div>`;
    renderKpis();
    renderDetail();
    return;
  }

  const groups = groupBy(tasks, (task) => task.zone || "Без зоны");
  elements.taskList.innerHTML = Object.entries(groups)
    .map(([zone, zoneTasks]) => renderZoneGroup(zone, zoneTasks))
    .join("");
  renderKpis();
  renderDetail();
}

function renderZoneGroup(zone, tasks) {
  const done = tasks.filter((task) => isCompleted(task.id)).length;
  return `
    <section class="zone-group">
      <header class="zone-header">
        <h3>${escapeHtml(zone)}</h3>
        <span>${done}/${tasks.length}</span>
      </header>
      ${tasks.map(renderTaskRow).join("")}
    </section>
  `;
}

function renderTaskRow(task) {
  const completion = getCompletion(task.id);
  const status = completion?.status || "Не выполнено";
  const statusClass = status === "Готово" || status === "Не требуется" ? "done" : status === "Проблема" ? "problem" : "pending";
  const toggleClass = status === "Готово" || status === "Не требуется" ? "done" : status === "Проблема" ? "problem" : "";
  const selected = task.id === state.selectedTaskId ? "selected" : "";
  const overdue = isOverdue(task);
  const note = completion?.note ? `<span class="task-note-preview">${escapeHtml(completion.note)}</span>` : "";
  return `
    <article class="task-row ${selected}">
      <button class="task-toggle ${toggleClass}" type="button" data-action="toggle" data-id="${escapeAttr(task.id)}" aria-label="Отметить задачу">${status === "Проблема" ? "!" : status === "Не выполнено" ? "" : "✓"}</button>
      <div class="task-main">
        <button class="task-title" type="button" data-action="select" data-id="${escapeAttr(task.id)}">${escapeHtml(task.title)}</button>
        <div class="task-description">${escapeHtml(task.description || task.standard || "")}</div>
      </div>
      <div class="task-meta">
        <span class="chip">${escapeHtml(task.frequency)}</span>
        <span class="chip time ${overdue ? "overdue" : ""}">${escapeHtml(task.dueTime || "Без срока")}</span>
      </div>
      <div class="task-meta">
        <span class="${priorityClass(task.priority)}">${escapeHtml(task.priority || "Средний")}</span>
        <span class="chip">${escapeHtml(task.evidence || "Нет")}</span>
      </div>
      <div class="task-status">
        <span class="status-pill ${statusClass}">${escapeHtml(status)}</span>
        ${note}
      </div>
    </article>
  `;
}

function renderDetail() {
  const task = state.tasks.find((item) => item.id === state.selectedTaskId);
  if (!task) {
    elements.detailZone.textContent = "Задача";
    elements.detailPriority.textContent = "-";
    elements.detailPriority.className = "priority-pill";
    elements.detailTitle.textContent = "Выберите задачу";
    elements.detailDescription.textContent = "Детали, стандарт выполнения и комментарий появятся здесь.";
    elements.detailFrequency.textContent = "-";
    elements.detailDue.textContent = "-";
    elements.detailEvidence.textContent = "-";
    elements.detailSupplies.textContent = "-";
    elements.detailStandard.textContent = "-";
    elements.taskNote.value = "";
    elements.evidenceUrl.value = "";
    return;
  }

  const completion = getCompletion(task.id);
  elements.detailZone.textContent = task.zone || "Без зоны";
  elements.detailPriority.textContent = task.priority || "Средний";
  elements.detailPriority.className = priorityClass(task.priority);
  elements.detailTitle.textContent = task.title;
  elements.detailDescription.textContent = task.description || task.comment || "";
  elements.detailFrequency.textContent = task.frequency || "-";
  elements.detailDue.textContent = task.dueTime || "-";
  elements.detailEvidence.textContent = task.evidence || "-";
  elements.detailSupplies.textContent = task.supplies || "-";
  elements.detailStandard.textContent = task.standard || "-";
  elements.taskNote.value = completion?.note || "";
  elements.evidenceUrl.value = completion?.evidenceUrl || "";
}

function renderKpis() {
  const tasks = getFilteredTasks(false);
  const total = tasks.length;
  const completed = tasks.filter((task) => isCompleted(task.id)).length;
  const problems = tasks.filter((task) => getCompletion(task.id)?.status === "Проблема").length;
  const overdue = tasks.filter((task) => !isCompleted(task.id) && isOverdue(task)).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const next = tasks
    .filter((task) => !isCompleted(task.id))
    .filter((task) => parseDueDate(task))
    .sort((a, b) => parseDueDate(a) - parseDueDate(b))[0];

  elements.doneKpi.textContent = `${completed}/${total}`;
  elements.progressKpi.textContent = `${percent}%`;
  elements.problemKpi.textContent = String(problems);
  elements.overdueKpi.textContent = String(overdue);
  elements.nextTaskKpi.textContent = next ? next.title : "-";
  elements.nextTaskTime.textContent = next ? next.dueTime : "нет срока";
}

function markSelected(status) {
  if (!state.selectedTaskId) return;
  markTask(state.selectedTaskId, status);
}

function markTask(taskId, status) {
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task) return;
  const key = completionKey(taskId);
  const entry = {
    shiftDate: state.shiftDate,
    shift: state.shift,
    taskId,
    taskTitle: task.title,
    zone: task.zone,
    status,
    problem: status === "Проблема" ? "Да" : "Нет",
    note: taskId === state.selectedTaskId ? elements.taskNote.value.trim() : getCompletion(taskId)?.note || "",
    evidenceUrl: taskId === state.selectedTaskId ? elements.evidenceUrl.value.trim() : getCompletion(taskId)?.evidenceUrl || "",
    employee: state.employee || elements.employeeName.value.trim(),
    timestamp: new Date().toISOString(),
    source: "site",
  };
  state.completions[key] = entry;
  saveStoredState();
  renderAll();
  postCompletion(entry);
}

function getFilteredTasks(applyProblemFilter = true) {
  const search = state.search;
  return getVisibleBaseTasks()
    .filter((task) => state.zone === "all" || task.zone === state.zone)
    .filter((task) => {
      if (!search) return true;
      return [task.zone, task.title, task.description, task.standard, task.comment].join(" ").toLowerCase().includes(search);
    })
    .filter((task) => {
      if (!applyProblemFilter || !state.problemOnly) return true;
      return getCompletion(task.id)?.status === "Проблема";
    });
}

function getVisibleBaseTasks() {
  return state.tasks
    .filter((task) => task.active)
    .filter((task) => shiftMatches(task))
    .filter((task) => frequencyDue(task))
    .sort((a, b) => sortByDue(a, b));
}

function shiftMatches(task) {
  const shift = normalizeShift(task.shift);
  return shift === "Обе" || shift === state.shift || task.frequency === "После каждого гостя";
}

function frequencyDue(task) {
  const frequency = normalizeText(task.frequency);
  if (["каждая смена", "каждый день", "после каждого гостя"].includes(frequency)) return true;

  const start = parseDateOnly(task.startDate) || parseDateOnly(state.shiftDate);
  const current = parseDateOnly(state.shiftDate);
  if (!start || !current) return true;
  const days = Math.floor((current - start) / MS_PER_DAY);
  if (days < 0) return false;

  if (frequency === "через день" || frequency === "каждые 2 дня") return days % 2 === 0;
  if (frequency === "каждые 3 дня") return days % 3 === 0;
  if (frequency === "еженедельно") return days % 7 === 0;
  if (frequency === "раз в 3 недели") return days % 21 === 0;
  if (frequency === "раз в месяц") return current.getUTCDate() === start.getUTCDate();

  const interval = Number(task.intervalDays);
  if (Number.isFinite(interval) && interval > 1) return days % interval === 0;
  return true;
}

function sortByDue(a, b) {
  const dateA = parseDueDate(a);
  const dateB = parseDueDate(b);
  if (dateA && dateB) return dateA - dateB;
  if (dateA) return -1;
  if (dateB) return 1;
  return `${a.zone}${a.title}`.localeCompare(`${b.zone}${b.title}`, "ru");
}

function parseDueDate(task) {
  const match = String(task.dueTime || "").match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  const baseDate = state.shift === "Ночная" && hour < 10 ? addDays(state.shiftDate, 1) : state.shiftDate;
  return new Date(`${baseDate}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00+10:00`);
}

function isOverdue(task) {
  const due = parseDueDate(task);
  if (!due) return false;
  return Date.now() > due.getTime();
}

function isCompleted(taskId) {
  const status = getCompletion(taskId)?.status;
  return status === "Готово" || status === "Проблема" || status === "Не требуется";
}

function getCompletion(taskId) {
  return state.completions[completionKey(taskId)];
}

function completionKey(taskId) {
  return `${state.shiftDate}|${state.shift}|${taskId}`;
}

function priorityClass(priority = "") {
  const value = normalizeText(priority);
  if (value === "критичный") return "priority-pill critical";
  if (value === "высокий") return "priority-pill high";
  return "priority-pill normal";
}

async function handleFileImport(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    setSyncStatus(`Читаю файл: ${file.name}`, "");
    const rows = file.name.toLowerCase().endsWith(".csv")
      ? parseCsv(await file.text())
      : await parseXlsx(file);
    const tasks = rowsToTasks(rows);
    if (!tasks.length) throw new Error("Не нашел задач. Проверьте лист “Задачи” и строку заголовков.");
    state.tasks = tasks;
    state.source = file.name;
    state.selectedTaskId = null;
    saveStoredState();
    renderAll();
    setSyncStatus(`Загружено задач: ${tasks.length}`, "ok");
  } catch (error) {
    console.error(error);
    setSyncStatus(error.message || "Не удалось прочитать файл.", "error");
  } finally {
    event.target.value = "";
  }
}

function rowsToTasks(rows) {
  const headerIndex = rows.findIndex((row) => {
    const values = row.map((cell) => normalizeText(cell));
    return values.includes("id") && values.includes("задача");
  });
  if (headerIndex === -1) return [];

  const sourceHeaders = rows[headerIndex].map((cell) => String(cell || "").trim());
  return rows
    .slice(headerIndex + 1)
    .map((row, index) => rowToTask(sourceHeaders, row, index))
    .filter((task) => task.title && task.id);
}

function rowToTask(sourceHeaders, row, index) {
  const record = {};
  for (let i = 0; i < sourceHeaders.length; i += 1) {
    record[sourceHeaders[i]] = row[i] ?? "";
  }
  const get = (...names) => {
    for (const name of names) {
      if (record[name] !== undefined && record[name] !== "") return record[name];
    }
    return "";
  };

  const title = cleanCell(get("Задача", "Название", "Title"));
  return {
    id: cleanCell(get("ID", "Код", "Код задачи")) || `TASK-${String(index + 1).padStart(3, "0")}`,
    active: !["нет", "no", "0", "false"].includes(normalizeText(get("Активна", "Активно", "Active") || "Да")),
    zone: cleanCell(get("Зона", "Zone")) || "Без зоны",
    title,
    description: cleanCell(get("Описание", "Description")),
    shift: normalizeShift(get("Смена", "Shift") || "Обе"),
    frequency: cleanCell(get("Периодичность", "Frequency")) || "Каждая смена",
    intervalDays: Number(cleanCell(get("Каждые N дней", "Интервал", "Interval"))) || 1,
    dueTime: cleanCell(get("Срок/время", "Срок", "Время", "Due")) || "",
    priority: cleanCell(get("Приоритет", "Priority")) || "Средний",
    evidence: cleanCell(get("Фото/подтверждение", "Подтверждение", "Evidence")) || "Нет",
    supplies: cleanCell(get("Инвентарь", "Supplies")) || "",
    standard: cleanCell(get("Стандарт выполнения", "Стандарт", "Standard")) || "",
    startDate: normalizeDate(cleanCell(get("Дата старта", "Start date", "Start"))) || state.shiftDate,
    comment: cleanCell(get("Комментарий", "Notes", "Comment")) || "",
  };
}

function tasksToRows(tasks) {
  return [
    headers,
    ...tasks.map((task) => [
      task.id,
      task.active ? "Да" : "Нет",
      task.zone,
      task.title,
      task.description,
      task.shift,
      task.frequency,
      task.intervalDays,
      task.dueTime,
      task.priority,
      task.evidence,
      task.supplies,
      task.standard,
      task.startDate,
      task.comment,
    ]),
  ];
}

function parseCsv(text) {
  const sample = text.split(/\r?\n/, 1)[0] || "";
  const delimiter = (sample.match(/;/g) || []).length > (sample.match(/,/g) || []).length ? ";" : ",";
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      value += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(value);
      if (row.some((cell) => String(cell).trim() !== "")) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }
  row.push(value);
  if (row.some((cell) => String(cell).trim() !== "")) rows.push(row);
  return rows;
}

async function parseXlsx(file) {
  if (!("DecompressionStream" in window)) {
    throw new Error("В этом браузере нет встроенной распаковки .xlsx. Откройте сайт в Chrome/Edge или загрузите CSV.");
  }
  const zip = new ZipArchive(await file.arrayBuffer());
  const workbookXml = await zip.text("xl/workbook.xml");
  const relsXml = await zip.text("xl/_rels/workbook.xml.rels");
  const workbook = parseXml(workbookXml);
  const rels = parseXml(relsXml);
  const relMap = new Map(
    elementsByLocalName(rels, "Relationship").map((rel) => [rel.getAttribute("Id"), rel.getAttribute("Target")]),
  );
  const sheets = elementsByLocalName(workbook, "sheet").map((sheet) => ({
    name: sheet.getAttribute("name"),
    rid: sheet.getAttribute("r:id") || sheet.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id"),
  }));
  const targetSheet = sheets.find((sheet) => normalizeText(sheet.name) === "задачи") || sheets[0];
  if (!targetSheet) throw new Error("В Excel-файле не найдены листы.");
  const target = relMap.get(targetSheet.rid);
  if (!target) throw new Error("Не удалось найти XML листа задач.");

  const sheetPath = joinZipPath("xl/workbook.xml", target);
  const sharedStrings = await readSharedStrings(zip);
  const sheetXml = await zip.text(sheetPath);
  return parseWorksheet(sheetXml, sharedStrings);
}

async function readSharedStrings(zip) {
  if (!zip.has("xl/sharedStrings.xml")) return [];
  const xml = parseXml(await zip.text("xl/sharedStrings.xml"));
  return elementsByLocalName(xml, "si").map((item) => item.textContent || "");
}

function parseWorksheet(sheetXml, sharedStrings) {
  const doc = parseXml(sheetXml);
  const rows = [];
  for (const rowEl of elementsByLocalName(doc, "row")) {
    const row = [];
    for (const cell of elementsByLocalName(rowEl, "c")) {
      const ref = cell.getAttribute("r") || "";
      const columnIndex = columnLettersToIndex(ref.match(/[A-Z]+/)?.[0] || "A");
      row[columnIndex] = readCellValue(cell, sharedStrings);
    }
    if (row.some((cell) => cleanCell(cell) !== "")) {
      rows.push(row.map((cell) => cell ?? ""));
    }
  }
  return rows;
}

function readCellValue(cell, sharedStrings) {
  const type = cell.getAttribute("t");
  if (type === "inlineStr") return cell.textContent || "";
  const value = firstElementByLocalName(cell, "v")?.textContent || "";
  if (type === "s") return sharedStrings[Number(value)] || "";
  if (type === "b") return value === "1" ? "Да" : "Нет";
  return value;
}

class ZipArchive {
  constructor(buffer) {
    this.buffer = buffer;
    this.view = new DataView(buffer);
    this.bytes = new Uint8Array(buffer);
    this.files = this.readCentralDirectory();
  }

  has(name) {
    return this.files.has(name);
  }

  async text(name) {
    const bytes = await this.extract(name);
    return new TextDecoder("utf-8").decode(bytes);
  }

  async extract(name) {
    const entry = this.files.get(name);
    if (!entry) throw new Error(`В .xlsx не найден файл ${name}`);
    const localOffset = entry.localOffset;
    if (this.view.getUint32(localOffset, true) !== 0x04034b50) throw new Error("Поврежденный .xlsx: local header.");
    const nameLength = this.view.getUint16(localOffset + 26, true);
    const extraLength = this.view.getUint16(localOffset + 28, true);
    const dataStart = localOffset + 30 + nameLength + extraLength;
    const compressed = this.bytes.slice(dataStart, dataStart + entry.compressedSize);
    if (entry.method === 0) return compressed;
    if (entry.method === 8) return inflateRaw(compressed);
    throw new Error(`Метод сжатия .xlsx не поддерживается: ${entry.method}`);
  }

  readCentralDirectory() {
    const files = new Map();
    const eocd = this.findEndOfCentralDirectory();
    const entries = this.view.getUint16(eocd + 10, true);
    let offset = this.view.getUint32(eocd + 16, true);
    const decoder = new TextDecoder("utf-8");

    for (let i = 0; i < entries; i += 1) {
      if (this.view.getUint32(offset, true) !== 0x02014b50) throw new Error("Поврежденный .xlsx: central directory.");
      const method = this.view.getUint16(offset + 10, true);
      const compressedSize = this.view.getUint32(offset + 20, true);
      const nameLength = this.view.getUint16(offset + 28, true);
      const extraLength = this.view.getUint16(offset + 30, true);
      const commentLength = this.view.getUint16(offset + 32, true);
      const localOffset = this.view.getUint32(offset + 42, true);
      const name = decoder.decode(this.bytes.slice(offset + 46, offset + 46 + nameLength));
      files.set(name, { method, compressedSize, localOffset });
      offset += 46 + nameLength + extraLength + commentLength;
    }
    return files;
  }

  findEndOfCentralDirectory() {
    const min = Math.max(0, this.bytes.length - 66000);
    for (let i = this.bytes.length - 22; i >= min; i -= 1) {
      if (this.view.getUint32(i, true) === 0x06054b50) return i;
    }
    throw new Error("Это не похоже на корректный .xlsx-файл.");
  }
}

async function inflateRaw(bytes) {
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

function parseXml(text) {
  const doc = new DOMParser().parseFromString(text, "application/xml");
  const parserError = elementsByLocalName(doc, "parsererror")[0];
  if (parserError) throw new Error("Не удалось разобрать XML внутри .xlsx.");
  return doc;
}

function elementsByLocalName(root, localName) {
  return [...root.getElementsByTagName("*")].filter((element) => element.localName === localName);
}

function firstElementByLocalName(root, localName) {
  return elementsByLocalName(root, localName)[0] || null;
}

function joinZipPath(basePath, target) {
  if (target.startsWith("/")) return target.slice(1);
  const parts = basePath.split("/");
  parts.pop();
  for (const part of target.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return parts.join("/");
}

async function syncNow() {
  state.scriptUrl = elements.scriptUrl.value.trim();
  saveStoredState();
  if (!state.scriptUrl) {
    setSyncStatus("Вставьте Apps Script URL.", "error");
    return;
  }
  try {
    setSyncStatus("Запрашиваю задачи и отметки из Google Sheets...", "");
    const data = await fetchAppsScriptState(state.scriptUrl);
    if (Array.isArray(data.tasks) && data.tasks.length) {
      state.tasks = data.tasks.map((task, index) => rowObjectToTask(task, index)).filter((task) => task.id && task.title);
      state.source = "Google Sheets";
    }
    if (Array.isArray(data.log)) mergeRemoteLog(data.log);
    saveStoredState();
    renderAll();
    setSyncStatus(`Синхронизировано. Задач: ${state.tasks.length}, отметок: ${Object.keys(state.completions).length}.`, "ok");
  } catch (error) {
    console.error(error);
    setSyncStatus(`${error.message}. Если таблица не опубликована, проверьте права Web app deployment.`, "error");
  }
}

async function fetchAppsScriptState(scriptUrl) {
  const url = withQuery(scriptUrl, { action: "state", t: Date.now() });
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Google Sheets ответил ${response.status}`);
    return await response.json();
  } catch (error) {
    if (!isAppsScriptUrl(scriptUrl)) throw error;
    return requestJsonp(url);
  }
}

function requestJsonp(url) {
  return new Promise((resolve, reject) => {
    const callback = `clubCleanlinessJsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("Apps Script не ответил на запрос синхронизации"));
    }, 15000);

    window[callback] = (data) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Не удалось загрузить данные из Apps Script"));
    };

    script.src = withQuery(url, { callback });
    document.head.appendChild(script);

    function cleanup() {
      window.clearTimeout(timer);
      script.remove();
      delete window[callback];
    }
  });
}

function isAppsScriptUrl(url) {
  try {
    const { hostname } = new URL(url);
    return hostname === "script.google.com" || hostname.endsWith(".googleusercontent.com");
  } catch {
    return false;
  }
}

function rowObjectToTask(row, index) {
  const sourceHeaders = Object.keys(row);
  const values = sourceHeaders.map((key) => row[key]);
  return rowToTask(sourceHeaders, values, index);
}

function mergeRemoteLog(logRows) {
  for (const row of logRows) {
    const taskId = cleanCell(row["ID задачи"] || row.taskId);
    const shiftDate = normalizeDate(cleanCell(row["Дата смены"] || row.shiftDate));
    const shift = normalizeShift(row["Смена"] || row.shift);
    if (!taskId || !shiftDate || !shift) continue;
    const key = `${shiftDate}|${shift}|${taskId}`;
    const entry = {
      shiftDate,
      shift,
      taskId,
      taskTitle: cleanCell(row["Задача"] || row.taskTitle),
      zone: cleanCell(row["Зона"] || row.zone),
      status: cleanCell(row["Статус"] || row.status) || "Готово",
      problem: cleanCell(row["Проблема"] || row.problem) || "Нет",
      note: cleanCell(row["Комментарий"] || row.note),
      evidenceUrl: cleanCell(row["Подтверждение/фото"] || row.evidenceUrl),
      employee: cleanCell(row["Сотрудник"] || row.employee),
      timestamp: cleanCell(row["Время отметки"] || row.timestamp) || new Date().toISOString(),
      source: "google-sheets",
    };
    const current = state.completions[key];
    if (!current || new Date(entry.timestamp) >= new Date(current.timestamp)) {
      state.completions[key] = entry;
    }
  }
}

async function postCompletion(entry) {
  if (!state.scriptUrl) return;
  try {
    const response = await fetch(state.scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "completion", entry }),
    });
    if (!response.ok) throw new Error(`Ответ ${response.status}`);
    setSyncStatus("Отметка записана в Google Sheets.", "ok");
  } catch (error) {
    try {
      await fetch(state.scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "completion", entry }),
      });
      setSyncStatus("Отметка отправлена в Apps Script. Ответ скрыт браузером, проверьте лист “Отметки”.", "ok");
    } catch (secondError) {
      console.error(error, secondError);
      setSyncStatus("Локально сохранено, но отправка в Google Sheets не прошла.", "error");
    }
  }
}

function withQuery(base, params) {
  const url = new URL(base);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  return url.toString();
}

function exportCurrentShiftLog() {
  const rows = [
    ["Дата смены", "Смена", "Сотрудник", "ID задачи", "Зона", "Задача", "Статус", "Проблема", "Комментарий", "Фото/ссылка", "Время отметки"],
    ...getVisibleBaseTasks().map((task) => {
      const entry = getCompletion(task.id);
      return [
        state.shiftDate,
        state.shift,
        entry?.employee || state.employee || "",
        task.id,
        task.zone,
        task.title,
        entry?.status || "Не выполнено",
        entry?.problem || "Нет",
        entry?.note || "",
        entry?.evidenceUrl || "",
        entry?.timestamp || "",
      ];
    }),
  ];
  downloadCsv(`otchet_smeny_${state.shiftDate}_${state.shift}.csv`, rowsToCsv(rows));
}

function rowsToCsv(rows) {
  return rows
    .map((row) =>
      row
        .map((value) => {
          const text = String(value ?? "");
          if (/[",\n;\r]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
          return text;
        })
        .join(";"),
    )
    .join("\n");
}

function downloadCsv(filename, csv) {
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function getCurrentShiftInfo() {
  const parts = getZonedParts(new Date());
  const today = `${parts.year}-${parts.month}-${parts.day}`;
  const hour = Number(parts.hour);
  if (hour >= 10 && hour < 22) return { shift: "Дневная", date: today };
  if (hour < 10) return { shift: "Ночная", date: addDays(today, -1) };
  return { shift: "Ночная", date: today };
}

function getZonedParts(date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return { year: map.year, month: map.month, day: map.day, hour: map.hour };
}

function addDays(dateStr, days) {
  const date = parseDateOnly(dateStr);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function parseDateOnly(value) {
  const normalized = normalizeDate(value);
  if (!normalized) return null;
  return new Date(`${normalized}T00:00:00Z`);
}

function normalizeDate(value) {
  if (value === null || value === undefined || value === "") return "";
  const text = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(text)) {
    const [day, month, year] = text.split(".");
    return `${year}-${month}-${day}`;
  }
  if (/^\d+(\.\d+)?$/.test(text)) {
    const serial = Number(text);
    if (serial > 30000 && serial < 60000) {
      const date = new Date(Date.UTC(1899, 11, 30) + serial * MS_PER_DAY);
      return date.toISOString().slice(0, 10);
    }
  }
  return text;
}

function normalizeShift(value) {
  const text = normalizeText(value);
  if (text.includes("ноч")) return "Ночная";
  if (text.includes("днев") || text === "день") return "Дневная";
  return "Обе";
}

function normalizeText(value) {
  return String(value ?? "").trim().toLowerCase();
}

function cleanCell(value) {
  return String(value ?? "").replace(/\uFEFF/g, "").trim();
}

function columnLettersToIndex(letters) {
  let num = 0;
  for (const char of letters) num = num * 26 + char.charCodeAt(0) - 64;
  return num - 1;
}

function groupBy(items, getter) {
  return items.reduce((acc, item) => {
    const key = getter(item);
    acc[key] ||= [];
    acc[key].push(item);
    return acc;
  }, {});
}

function setSyncStatus(message, kind) {
  elements.syncStatus.textContent = message;
  elements.syncStatus.className = `sync-status ${kind || ""}`.trim();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function loadStoredState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      tasks: Array.isArray(parsed.tasks) && parsed.tasks.length ? parsed.tasks : seedTasks,
      completions: parsed.completions || {},
      selectedTaskId: parsed.selectedTaskId || null,
      shiftDate: parsed.shiftDate || "",
      shift: parsed.shift || "",
      zone: parsed.zone || "all",
      search: "",
      problemOnly: Boolean(parsed.problemOnly),
      scriptUrl: parsed.scriptUrl || "",
      employee: parsed.employee || "",
      source: parsed.source || "Встроенный шаблон",
    };
  } catch {
    return {};
  }
}

function saveStoredState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      tasks: state.tasks,
      completions: state.completions,
      selectedTaskId: state.selectedTaskId,
      shiftDate: state.shiftDate,
      shift: state.shift,
      zone: state.zone,
      problemOnly: state.problemOnly,
      scriptUrl: state.scriptUrl,
      employee: state.employee,
      source: state.source,
    }),
  );
}
