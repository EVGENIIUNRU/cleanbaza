import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/evgenij/Documents/New project 5/club_cleanliness_control";
const outputPath = `${outputDir}/shablon_chistoty_kompyuternogo_kluba.xlsx`;

const workbook = Workbook.create();

const palette = {
  title: "#172536",
  header: "#244B6B",
  headerAlt: "#315F7F",
  soft: "#EEF6F8",
  good: "#DFF2E5",
  warning: "#FFF2CC",
  danger: "#FCE4D6",
  border: "#D6E0E7",
  text: "#1F2933",
  muted: "#667085",
};

const tasks = [
  ["CLN-001", "Да", "Зал ПК", "Влажная уборка всех столов", "Протереть все свободные и освободившиеся столы, убрать пыль, крошки и липкие следы.", "Обе", "Каждый день", 1, "11:00", "Высокий", "Нет", "Микрофибра, средство для столов", "На столах нет пыли, крошек, пятен и мусора.", "2026-06-04", "Базовая ежедневная задача."],
  ["CLN-002", "Да", "Зал ПК", "Мониторы без пыли и следов", "Аккуратно протереть экраны сухой/специальной микрофиброй и средством для экранов.", "Обе", "Каждый день", 1, "12:00", "Высокий", "Нет", "Микрофибра для экранов", "Экраны чистые, без разводов и отпечатков.", "2026-06-04", "Не использовать агрессивную химию."],
  ["CLN-003", "Да", "Зал ПК", "Контроль чистоты кресел", "Протереть подлокотники, сиденья, спинки; убрать крошки и поправить положение кресел.", "Обе", "Каждый день", 1, "15:00", "Средний", "Нет", "Салфетки, средство для поверхностей", "Кресла ровно стоят, нет крошек и видимых загрязнений.", "2026-06-04", ""],
  ["CLN-004", "Да", "Вход", "Стекла на входе", "Протереть входные стекла и ручки, убрать отпечатки.", "Дневная", "Каждый день", 1, "13:00", "Средний", "Нет", "Средство для стекол", "На стеклах нет заметных следов рук и разводов.", "2026-06-04", ""],
  ["CLN-005", "Да", "Холодильники", "Стекла холодильников", "Протереть фасады холодильников, ручки и видимые полки.", "Дневная", "Каждый день", 1, "14:00", "Средний", "Нет", "Средство для стекол, микрофибра", "Стекла чистые, товар виден, ручки не липкие.", "2026-06-04", ""],
  ["CLN-006", "Да", "Санузел", "Санузел: чистота и запах", "Проверить пол, зеркало, раковину, унитаз, мусор, запах.", "Обе", "Каждая смена", 1, "Каждые 3 часа", "Критичный", "При проблеме", "Перчатки, чистящие средства", "Санузел чистый, мусор не переполнен, запах нейтральный.", "2026-06-04", "Отмечать проблему, если нужна помощь или ремонт."],
  ["CLN-007", "Да", "Санузел", "Расходники санузла", "Проверить мыло, туалетную бумагу и сухие рулоны/полотенца для рук.", "Обе", "Каждая смена", 1, "Начало и конец", "Критичный", "При проблеме", "Запас мыла, бумаги, рулонов", "Все расходники есть с запасом до следующей проверки.", "2026-06-04", ""],
  ["CLN-008", "Да", "Логово", "Пылесос ковра в логове", "Пропылесосить ковер, особенно под столами и возле кресел.", "Ночная", "Через день", 2, "03:00", "Средний", "Нет", "Пылесос", "На ковре нет крошек, мусора и заметной пыли.", "2026-06-04", "Если была компания с едой, выполнить вне графика."],
  ["CLN-009", "Да", "Зона питания", "Пылесос ковра в зоне питания", "Пропылесосить ковер/пол в зоне питания, убрать крошки под столом.", "Ночная", "Через день", 2, "03:30", "Средний", "Нет", "Пылесос", "Зона питания без крошек и мусора.", "2026-06-04", ""],
  ["CLN-010", "Да", "ПК", "Пылесос сеток на ПК", "Аккуратно пропылесосить внешние сетки/фильтры корпусов ПК без разборки.", "Ночная", "Каждые 2 дня", 2, "04:00", "Высокий", "При проблеме", "Пылесос, мягкая насадка", "Сетки не забиты пылью, поток воздуха не перекрыт.", "2026-06-04", "Не дергать провода и не разбирать корпус без разрешения."],
  ["CLN-011", "Да", "Периферия", "Быстрая чистота мышек и наушников", "После гостя протереть мышку, амбушюры/дужки наушников и убрать видимые загрязнения.", "Обе", "После каждого гостя", 0, "После гостя", "Средний", "Нет", "Дезинфицирующие салфетки", "Периферия не липкая, без мусора и видимых следов.", "2026-06-04", "Эта задача показывается в обе смены как постоянное правило."],
  ["CLN-012", "Да", "Периферия", "Глубокая чистка клавиатур", "Продуть и протереть клавиатуры, убрать крошки между клавишами.", "Ночная", "Раз в 3 недели", 21, "05:00", "Средний", "Да", "Сжатый воздух, кисть, салфетки", "Клавиатуры чистые визуально и между клавишами.", "2026-06-04", "Можно делить по зонам, если клавиатур много."],
  ["CLN-013", "Да", "Ресепшен", "Рабочая зона администратора", "Протереть ресепшен, терминал, рабочие мониторы, убрать личные вещи и лишние чеки.", "Обе", "Каждая смена", 1, "Начало смены", "Средний", "Нет", "Микрофибра, салфетки", "Рабочая зона выглядит аккуратно для гостя.", "2026-06-04", ""],
  ["CLN-014", "Да", "Зал ПК", "Обход чистоты клуба", "Пройти весь клуб: мусор, пустые банки, запахи, пыль, занятые и свободные места.", "Обе", "Каждая смена", 1, "Каждые 3-4 часа", "Высокий", "При проблеме", "Пакеты для мусора, салфетки", "Нет очевидного мусора, зоны выглядят под контролем.", "2026-06-04", "Использовать правило 20% загруженности: концентрировать гостей в активных зонах."],
  ["CLN-015", "Да", "Передача смены", "Передача проблем следующей смене", "Записать нерешенные проблемы по чистоте, технике, расходникам и гостям.", "Обе", "Каждая смена", 1, "Конец смены", "Высокий", "Нет", "Комментарий в системе", "Следующая смена понимает, что осталось сделать.", "2026-06-04", ""],
];

const logHeaders = [
  "Время отметки",
  "Дата смены",
  "Смена",
  "Сотрудник",
  "ID задачи",
  "Зона",
  "Задача",
  "Статус",
  "Проблема",
  "Комментарий",
  "Подтверждение/фото",
  "Источник",
];

const dictionaries = {
  zones: ["Зал ПК", "ПК", "Периферия", "Логово", "Зона питания", "Санузел", "Вход", "Холодильники", "Ресепшен", "Передача смены"],
  shifts: ["Дневная", "Ночная", "Обе"],
  frequencies: ["Каждая смена", "Каждый день", "Через день", "Каждые 2 дня", "Каждые 3 дня", "Еженедельно", "Раз в 3 недели", "Раз в месяц", "После каждого гостя"],
  priorities: ["Низкий", "Средний", "Высокий", "Критичный"],
  evidence: ["Нет", "Да", "При проблеме"],
  statuses: ["Готово", "Проблема", "Не требуется", "Не выполнено"],
};

const sheets = {
  tasks: workbook.worksheets.getOrAdd("Задачи", { renameFirstIfOnlyNewSpreadsheet: true }),
  log: workbook.worksheets.getOrAdd("Отметки"),
  dictionaries: workbook.worksheets.getOrAdd("Справочники"),
  instructions: workbook.worksheets.getOrAdd("Инструкция"),
};

function colName(num) {
  let s = "";
  while (num > 0) {
    const mod = (num - 1) % 26;
    s = String.fromCharCode(65 + mod) + s;
    num = Math.floor((num - mod) / 26);
  }
  return s;
}

function a1(row, col) {
  return `${colName(col)}${row}`;
}

function rangeAddress(startRow, startCol, rowCount, colCount) {
  return `${a1(startRow, startCol)}:${a1(startRow + rowCount - 1, startCol + colCount - 1)}`;
}

function write(ws, row, col, values) {
  ws.getRange(rangeAddress(row, col, values.length, values[0].length)).values = values;
}

function reset(ws) {
  if (ws.reset) ws.reset();
  try {
    ws.showGridLines = false;
  } catch {
    // Cosmetic only.
  }
}

function title(ws, text, range) {
  ws.getRange(range).merge();
  const r = ws.getRange(range);
  r.values = [[text]];
  r.format = {
    fill: palette.title,
    font: { color: "#FFFFFF", bold: true, size: 16 },
    horizontalAlignment: "left",
    verticalAlignment: "center",
  };
  r.format.rowHeightPx = 36;
}

function table(ws, row, col, rows, cols, options = {}) {
  const header = ws.getRange(rangeAddress(row, col, 1, cols));
  header.format = {
    fill: options.headerFill || palette.header,
    font: { color: "#FFFFFF", bold: true },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "outside", style: "thin", color: palette.border },
  };
  header.format.rowHeightPx = 34;
  if (rows > 1) {
    ws.getRange(rangeAddress(row + 1, col, rows - 1, cols)).format = {
      fill: "#FFFFFF",
      font: { color: palette.text, size: 10 },
      verticalAlignment: "top",
      wrapText: true,
      borders: { preset: "all", style: "thin", color: palette.border },
    };
  }
}

function section(ws, text, range) {
  ws.getRange(range).merge();
  const r = ws.getRange(range);
  r.values = [[text]];
  r.format = {
    fill: palette.soft,
    font: { color: palette.text, bold: true },
    horizontalAlignment: "left",
    verticalAlignment: "center",
    borders: { preset: "outside", style: "thin", color: palette.border },
  };
  r.format.rowHeightPx = 28;
}

function widths(ws, map, maxRow = 400) {
  for (const [col, px] of Object.entries(map)) {
    ws.getRange(`${col}1:${col}${maxRow}`).format.columnWidthPx = px;
  }
}

function validateList(ws, range, values) {
  ws.getRange(range).dataValidation = {
    allowBlank: true,
    list: { inCellDropDown: true, source: values },
  };
}

function validateDate(ws, range) {
  ws.getRange(range).dataValidation = {
    allowBlank: true,
    rule: {
      type: "date",
      operator: "between",
      formula1: "=DATE(2026,1,1)",
      formula2: "=DATE(2030,12,31)",
    },
  };
}

for (const ws of Object.values(sheets)) reset(ws);

title(sheets.tasks, "Задачи чистоты компьютерного клуба", "A1:O1");
write(sheets.tasks, 3, 1, [[
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
], ...tasks]);
table(sheets.tasks, 3, 1, tasks.length + 1, 15);
sheets.tasks.freezePanes.freezeRows(3);
validateList(sheets.tasks, "B4:B250", ["Да", "Нет"]);
validateList(sheets.tasks, "C4:C250", dictionaries.zones);
validateList(sheets.tasks, "F4:F250", dictionaries.shifts);
validateList(sheets.tasks, "G4:G250", dictionaries.frequencies);
validateList(sheets.tasks, "J4:J250", dictionaries.priorities);
validateList(sheets.tasks, "K4:K250", dictionaries.evidence);
validateDate(sheets.tasks, "N4:N250");
sheets.tasks.getRange("N4:N250").format.numberFormat = "yyyy-mm-dd";
sheets.tasks.getRange("J4:J250").conditionalFormats.add("containsText", { text: "Критичный", format: { fill: palette.danger, font: { color: "#9C0006", bold: true } } });
sheets.tasks.getRange("J4:J250").conditionalFormats.add("containsText", { text: "Высокий", format: { fill: palette.warning, font: { color: "#7F6000", bold: true } } });
widths(sheets.tasks, {
  A: 90, B: 80, C: 140, D: 250, E: 420, F: 100, G: 135, H: 95, I: 115, J: 105, K: 145, L: 250, M: 360, N: 110, O: 300,
}, 280);

title(sheets.log, "Отметки смен: сюда пишет сайт через Apps Script", "A1:L1");
write(sheets.log, 3, 1, [logHeaders]);
table(sheets.log, 3, 1, 400, logHeaders.length);
sheets.log.freezePanes.freezeRows(3);
validateDate(sheets.log, "B4:B400");
validateList(sheets.log, "C4:C400", ["Дневная", "Ночная"]);
validateList(sheets.log, "H4:H400", dictionaries.statuses);
sheets.log.getRange("A4:A400").format.numberFormat = "yyyy-mm-dd hh:mm";
sheets.log.getRange("B4:B400").format.numberFormat = "yyyy-mm-dd";
widths(sheets.log, { A: 160, B: 110, C: 105, D: 140, E: 95, F: 135, G: 280, H: 115, I: 95, J: 300, K: 240, L: 160 }, 430);

title(sheets.dictionaries, "Справочники для выпадающих списков", "A1:H1");
write(sheets.dictionaries, 3, 1, [["Зоны", "Смены", "Периодичность", "Приоритеты", "Подтверждение", "Статусы отметок"]]);
const maxDictRows = Math.max(...Object.values(dictionaries).map((list) => list.length));
write(sheets.dictionaries, 4, 1, Array.from({ length: maxDictRows }, (_, i) => [
  dictionaries.zones[i] || "",
  dictionaries.shifts[i] || "",
  dictionaries.frequencies[i] || "",
  dictionaries.priorities[i] || "",
  dictionaries.evidence[i] || "",
  dictionaries.statuses[i] || "",
]));
table(sheets.dictionaries, 3, 1, maxDictRows + 1, 6, { headerFill: palette.headerAlt });
widths(sheets.dictionaries, { A: 180, B: 120, C: 180, D: 130, E: 170, F: 160 }, 40);

title(sheets.instructions, "Как заполнять и подключать", "A1:H1");
section(sheets.instructions, "Главное", "A3:H3");
write(sheets.instructions, 4, 1, [
  ["Что делать", "Пояснение"],
  ["Редактировать задачи", "Меняй строки на листе Задачи: зона, смена, периодичность, срок и стандарт выполнения."],
  ["Активна", "Поставь Нет, если задачу нужно временно скрыть с сайта."],
  ["Смена", "Дневная = 10:00-22:00, Ночная = 22:00-10:00, Обе = показывать обеим сменам."],
  ["Дата старта", "Нужна для задач через день, каждые 2 дня, раз в 3 недели и раз в месяц."],
  ["Отметки", "Сайт сохраняет выполнение в браузере. Для удаленной синхронизации подключи Apps Script к этой Google-таблице."],
]);
table(sheets.instructions, 4, 1, 6, 2);
section(sheets.instructions, "Порядок подключения Google Drive", "A12:H12");
write(sheets.instructions, 13, 1, [
  ["Шаг", "Действие"],
  ["1", "Импортируй этот Excel в Google Sheets."],
  ["2", "Открой Extensions / Apps Script и вставь код из файла apps-script.gs рядом с сайтом."],
  ["3", "Deploy / New deployment / Web app: Execute as Me, Who has access Anyone with the link."],
  ["4", "Скопируй Web app URL в сайт в поле Apps Script URL."],
  ["5", "После этого отметки смен будут добавляться на лист Отметки, а задачи можно править прямо в Google Sheets."],
]);
table(sheets.instructions, 13, 1, 6, 2, { headerFill: palette.headerAlt });
widths(sheets.instructions, { A: 160, B: 780, C: 80, D: 80, E: 80, F: 80, G: 80, H: 80 }, 35);

for (const ws of Object.values(sheets)) {
  const used = ws.getUsedRange?.();
  if (used) {
    used.format.font = { name: "Calibri", size: 10, color: palette.text };
    used.format.verticalAlignment = "top";
  }
}

workbook.recalculate();

await fs.mkdir(outputDir, { recursive: true });
const preview = await workbook.render({ sheetName: "Задачи", range: "A1:O22", format: "png", scale: 1 });
await fs.writeFile(`${outputDir}/preview_shablon_zadach.png`, Buffer.from(await preview.arrayBuffer()));

const errorScan = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log(errorScan.ndjson);

const taskCheck = await workbook.inspect({
  kind: "table",
  range: "Задачи!A3:O18",
  include: "values",
  tableMaxRows: 20,
  tableMaxCols: 15,
});
console.log(taskCheck.ndjson);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
