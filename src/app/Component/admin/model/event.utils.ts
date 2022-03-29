import { EventInput } from '@fullcalendar/angular';
import { Component, OnInit } from '@angular/core';
let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
//new Date('12-1-2021 23:15:30');
const date = '12-1-2021 14:15:30';
const date1 = '12-2-2021 13:15:30';

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: '1',
    title: 'All-day event',
    start: DateType(date),
  },
  {
    id: '2',
    title: 'Timed event',
    start: DateType(date1),
  },
  {
    id: '3',
    title: 'Hemanth Event Todat',
    start: new Date(date),
  },
];

export function createEventId() {
  return String(eventGuid++);
}

export function DateType(date: string) {
  return new Date(date);
}
