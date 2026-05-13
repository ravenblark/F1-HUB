document.addEventListener("DOMContentLoaded", function () {
  // 2026 Race Calendar with dates and timezones
  var races = [
    {
      round: 1,
      location: "Australia",
      flag: "au",
      date: "06 - 08 MAR",
      startDate: "2026-03-06",
      endDate: "2026-03-08",
      timezone: "Australia/Melbourne",
    },
    {
      round: 2,
      location: "China",
      flag: "cn",
      date: "13 - 15 MAR",
      startDate: "2026-03-13",
      endDate: "2026-03-15",
      timezone: "Asia/Shanghai",
    },
    {
      round: 3,
      location: "Japan",
      flag: "jp",
      date: "27 - 29 MAR",
      startDate: "2026-03-27",
      endDate: "2026-03-29",
      timezone: "Asia/Tokyo",
    },
    {
      round: 4,
      location: "Miami",
      flag: "us",
      date: "01 - 03 MAY",
      startDate: "2026-05-01",
      endDate: "2026-05-03",
      timezone: "America/New_York",
    },
    {
      round: 5,
      location: "Canada",
      flag: "ca",
      date: "22 - 24 MAY",
      startDate: "2026-05-22",
      endDate: "2026-05-24",
      timezone: "America/Toronto",
    },
    {
      round: 6,
      location: "Monaco",
      flag: "mc",
      date: "05 - 07 JUN",
      startDate: "2026-06-05",
      endDate: "2026-06-07",
      timezone: "Europe/Monaco",
    },
    {
      round: 7,
      location: "Barcelona",
      flag: "es",
      date: "12 - 14 JUN",
      startDate: "2026-06-12",
      endDate: "2026-06-14",
      timezone: "Europe/Madrid",
    },
    {
      round: 8,
      location: "Austria",
      flag: "at",
      date: "26 - 28 JUN",
      startDate: "2026-06-26",
      endDate: "2026-06-28",
      timezone: "Europe/Vienna",
    },
    {
      round: 9,
      location: "Great Britain",
      flag: "gb",
      date: "03 - 05 JUL",
      startDate: "2026-07-03",
      endDate: "2026-07-05",
      timezone: "Europe/London",
    },
    {
      round: 10,
      location: "Belgium",
      flag: "be",
      date: "17 - 19 JUL",
      startDate: "2026-07-17",
      endDate: "2026-07-19",
      timezone: "Europe/Brussels",
    },
    {
      round: 11,
      location: "Hungary",
      flag: "hu",
      date: "24 - 26 JUL",
      startDate: "2026-07-24",
      endDate: "2026-07-26",
      timezone: "Europe/Budapest",
    },
    {
      round: 12,
      location: "Netherlands",
      flag: "nl",
      date: "21 - 23 AUG",
      startDate: "2026-08-21",
      endDate: "2026-08-23",
      timezone: "Europe/Amsterdam",
    },
    {
      round: 13,
      location: "Italy",
      flag: "it",
      date: "04 - 06 SEP",
      startDate: "2026-09-04",
      endDate: "2026-09-06",
      timezone: "Europe/Rome",
    },
    {
      round: 14,
      location: "Spain",
      flag: "es",
      date: "11 - 13 SEP",
      startDate: "2026-09-11",
      endDate: "2026-09-13",
      timezone: "Europe/Madrid",
    },
    {
      round: 15,
      location: "Azerbaijan",
      flag: "az",
      date: "24 - 26 SEP",
      startDate: "2026-09-24",
      endDate: "2026-09-26",
      timezone: "Asia/Baku",
    },
    {
      round: 16,
      location: "Singapore",
      flag: "sg",
      date: "09 - 11 OCT",
      startDate: "2026-10-09",
      endDate: "2026-10-11",
      timezone: "Asia/Singapore",
    },
    {
      round: 17,
      location: "United States",
      flag: "us",
      date: "23 - 25 OCT",
      startDate: "2026-10-23",
      endDate: "2026-10-25",
      timezone: "America/Chicago",
    },
    {
      round: 18,
      location: "Mexico",
      flag: "mx",
      date: "30 OCT - 01 NOV",
      startDate: "2026-10-30",
      endDate: "2026-11-01",
      timezone: "America/Mexico_City",
    },
    {
      round: 19,
      location: "Brazil",
      flag: "br",
      date: "06 - 08 NOV",
      startDate: "2026-11-06",
      endDate: "2026-11-08",
      timezone: "America/Sao_Paulo",
    },
    {
      round: 20,
      location: "Las Vegas",
      flag: "us",
      date: "19 - 21 NOV",
      startDate: "2026-11-19",
      endDate: "2026-11-21",
      timezone: "America/Los_Angeles",
    },
    {
      round: 21,
      location: "Qatar",
      flag: "qa",
      date: "27 - 29 NOV",
      startDate: "2026-11-27",
      endDate: "2026-11-29",
      timezone: "Asia/Qatar",
    },
    {
      round: 22,
      location: "Abu Dhabi",
      flag: "ae",
      date: "04 - 06 DEC",
      startDate: "2026-12-04",
      endDate: "2026-12-06",
      timezone: "Asia/Dubai",
    },
  ];

  function getNextRace() {
    var now = new Date();
    for (var i = 0; i < races.length; i++) {
      // Race ends at 23:59 on the end date
      var raceEnd = new Date(races[i].endDate + "T23:59:59");
      if (now <= raceEnd) {
        return races[i];
      }
    }
    // If all races are done, show the last one
    return races[races.length - 1];
  }

  function updateTicker() {
    var race = getNextRace();
    if (!race) return;

    // Update round number and date
    var roundNum = document.querySelector(".round-num");
    if (roundNum) {
      roundNum.textContent =
        "R" + String(race.round).padStart(2, "0") + " | " + race.date;
    }

    // Update flag
    var flagImg = document.querySelector(".race-location img");
    if (flagImg) {
      flagImg.src = "https://flagcdn.com/w20/" + race.flag + ".png";
      flagImg.alt = race.location + " Flag";
    }

    // Update location name
    var locationName = document.querySelector(".race-location .f1-wide-font");
    if (locationName) {
      locationName.textContent = race.location.toUpperCase();
    }

    // Update clocks
    function updateClocks() {
      var now = new Date();

      // My time (local)
      var localClock = document.getElementById("local-clock");
      if (localClock) {
        localClock.textContent = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      }

      // Track time (next race timezone)
      var trackClock = document.getElementById("track-clock");
      if (trackClock) {
        try {
          var trackTime = new Date(
            now.toLocaleString("en-US", { timeZone: race.timezone }),
          );
          trackClock.textContent = trackTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        } catch (e) {
          trackClock.textContent = "--:--";
        }
      }
    }

    updateClocks();
    setInterval(updateClocks, 1000);
  }

  updateTicker();
});
