const TASK_SHEET = 'Задачи';
const LOG_SHEET = 'Отметки';

const LOG_HEADERS = [
  'Время отметки',
  'Дата смены',
  'Смена',
  'Сотрудник',
  'ID задачи',
  'Зона',
  'Задача',
  'Статус',
  'Проблема',
  'Комментарий',
  'Подтверждение/фото',
  'Источник',
];

function doGet(e) {
  const action = String(e.parameter.action || 'state');
  if (action === 'ping') {
    return json_({ ok: true, time: new Date().toISOString() });
  }
  if (action === 'tasks') {
    return json_({ ok: true, tasks: readTable_(TASK_SHEET) });
  }
  if (action === 'log') {
    return json_({ ok: true, log: readTable_(LOG_SHEET) });
  }
  return json_({
    ok: true,
    tasks: readTable_(TASK_SHEET),
    log: readTable_(LOG_SHEET),
    time: new Date().toISOString(),
  });
}

function doPost(e) {
  const body = parseBody_(e);
  if (body.action === 'completion') {
    appendCompletion_(body.entry || {});
    return json_({ ok: true, saved: 1, time: new Date().toISOString() });
  }
  if (body.action === 'bulkCompletion') {
    const entries = Array.isArray(body.entries) ? body.entries : [];
    entries.forEach((entry) => appendCompletion_(entry));
    return json_({ ok: true, saved: entries.length, time: new Date().toISOString() });
  }
  return json_({ ok: false, error: 'Unknown action' });
}

function appendCompletion_(entry) {
  const sheet = getOrCreateSheet_(LOG_SHEET, LOG_HEADERS);
  sheet.appendRow([
    entry.timestamp ? new Date(entry.timestamp) : new Date(),
    entry.shiftDate || '',
    entry.shift || '',
    entry.employee || '',
    entry.taskId || '',
    entry.zone || '',
    entry.taskTitle || '',
    entry.status || 'Готово',
    entry.problem || (entry.status === 'Проблема' ? 'Да' : 'Нет'),
    entry.note || '',
    entry.evidenceUrl || '',
    entry.source || 'site',
  ]);
}

function readTable_(sheetName) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  if (!sheet) return [];
  const values = sheet.getDataRange().getDisplayValues();
  if (!values.length) return [];

  const headerIndex = values.findIndex((row) => row.some((cell) => String(cell).trim() === 'ID' || String(cell).trim() === 'Время отметки'));
  if (headerIndex === -1) return [];

  const headers = values[headerIndex].map((cell) => String(cell).trim());
  return values
    .slice(headerIndex + 1)
    .filter((row) => row.some((cell) => String(cell).trim() !== ''))
    .map((row) => {
      const record = {};
      headers.forEach((header, index) => {
        if (header) record[header] = row[index] || '';
      });
      return record;
    });
}

function getOrCreateSheet_(sheetName, headers) {
  const spreadsheet = SpreadsheetApp.getActive();
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    return {};
  }
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
