export const GenerateTimeSlot = (
  start: any,
  end: any,
  timespan: any,
  eventsArray: any
) => {
  function dateClone(val: any) {
    return new Date(val);
  }
  function toDate(val: any) {
    if (val instanceof Date) return val;
    return new Date(val);
  }

  function dateExtend(date: any, timespanMS: any) {
    date.setTime(date.getTime() + timespanMS);
  }

  function availability(start: any, end: any, timespan: any, eventsArray: any) {
    const timespanMS = timespan * 1000;
    const timeslotStart = dateClone(start);
    const timeslotEnd = dateClone(start);
    dateExtend(timeslotEnd, timespanMS);

    // function eventOverlap({ start: start2, end: end2 }) {
    //   return timeslotStart >= toDate(start2) && timeslotStart < toDate(end2);
    // }

    const availArray = [];
    while (timeslotStart < toDate(end)) {
      if (true) {
        availArray.push({
          start: dateClone(timeslotStart),
          end: dateClone(timeslotEnd),
        });
      }
      dateExtend(timeslotStart, timespanMS);
      dateExtend(timeslotEnd, timespanMS);
    }

    return availArray;
  }

  const bookable = availability(start, end, timespan, eventsArray);
  const appoint = [];
  const slot1: any[] = [];
  const slot2: any[] = [];
  for (var i = 0; i < bookable.length; i++) {
    appoint.push(
      bookable[i].start
        .toTimeString()
        .replace('GMT+0530 (India Standard Time)', '')
        .replace(':00:00', '')
        .replace(':30:00', ':30') +
        'to' +
        bookable[i].end
          .toTimeString()
          .replace('GMT+0530 (India Standard Time)', '')
          .replace(':00', '')
    );
  }

  appoint.forEach((element) =>
    (element < '16 -16:30' ? slot1 : slot2).push(element)
  );

  function mergeDates(eventsArray: any) {
    return eventsArray.reduce(reducer, []);
  }

  function reducer(intervals: any) {
    function someCallback({ start, end }: any, index: string | number) {
      // no overlap?
      var startInput: any;
      var endInput: any;
      if (endInput < start) {
        return false;
      }
      let extended = false;
      // extend after?
      if (startInput < end && endInput > end) {
        intervals[index].end = endInput;
        extended = true;
      }
      // extend before?
      if (startInput < start && endInput > start) {
        intervals[index].start = startInput;
        extended = true;
      }
      return extended;
    }
    const found = intervals.some(someCallback);
    if (found === false) {
      // intervals.push({ start: startInput, end: endInput });
    }
    return intervals;
  }

  return [slot1, slot2];

  //return availability(start, end, timespan, eventsArray);
};
