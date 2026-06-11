const TASK_SHEET = 'Задачи';
const LOG_SHEET = 'Отметки';
const STATUS_SHEET = 'Статус смены';
const TZ = 'Asia/Vladivostok';

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

const STATUS_HEADERS = [
  'Дата смены',
  'Смена',
  'ID задачи',
  'Зона',
  'Задача',
  'Статус',
  'Проблема',
  'Сотрудник',
  'Комментарий',
  'Подтверждение/фото',
  'Обновлено',
  'Источник',
];

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const action = String(params.action || 'state');
  let data;
  if (action === 'ping') {
    data = { ok: true, time: new Date().toISOString() };
  } else if (action === 'tasks') {
    data = { ok: true, tasks: readTable_(TASK_SHEET) };
  } else if (action === 'log') {
    data = { ok: true, log: readTable_(LOG_SHEET) };
  } else if (action === 'status') {
    data = { ok: true, status: readTable_(STATUS_SHEET) };
  } else {
    data = {
      ok: true,
      tasks: readTable_(TASK_SHEET),
      log: readTable_(LOG_SHEET),
      status: readTable_(STATUS_SHEET),
      time: new Date().toISOString(),
    };
  }
  return json_(data, params.callback);
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
  const timestamp = parseTimestamp_(entry.timestamp);
  const timestampText = formatTimestamp_(timestamp);
  sheet.appendRow([
    timestampText,
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
  upsertShiftStatus_(entry, timestampText);
}

function upsertShiftStatus_(entry, timestampText) {
  if (!entry.shiftDate || !entry.shift || !entry.taskId) return;
  const sheet = getOrCreateSheet_(STATUS_SHEET, STATUS_HEADERS);
  const key = [entry.shiftDate, entry.shift, entry.taskId].join('|');
  const row = [
    entry.shiftDate || '',
    entry.shift || '',
    entry.taskId || '',
    entry.zone || '',
    entry.taskTitle || '',
    entry.status || 'Готово',
    entry.problem || (entry.status === 'Проблема' ? 'Да' : 'Нет'),
    entry.employee || '',
    entry.note || '',
    entry.evidenceUrl || '',
    timestampText,
    entry.source || 'site',
  ];

  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const keys = sheet.getRange(2, 1, lastRow - 1, 3).getDisplayValues();
    for (let index = 0; index < keys.length; index += 1) {
      if (keys[index].join('|') === key) {
        sheet.getRange(index + 2, 1, 1, STATUS_HEADERS.length).setValues([row]);
        return;
      }
    }
  }
  sheet.appendRow(row);
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

function parseTimestamp_(value) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function formatTimestamp_(date) {
  return Utilities.formatDate(date, TZ, 'dd.MM.yyyy HH:mm:ss');
}

function json_(data, callback) {
  const payload = JSON.stringify(data);
  const callbackName = String(callback || '').trim();
  if (callbackName) {
    const validCallback = /^[A-Za-z_$][0-9A-Za-z_$]*(\.[A-Za-z_$][0-9A-Za-z_$]*)*$/.test(callbackName);
    const body = validCallback ? `${callbackName}(${payload});` : '/* invalid callback */';
    return ContentService
      .createTextOutput(body)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(payload)
    .setMimeType(ContentService.MimeType.JSON);
}
