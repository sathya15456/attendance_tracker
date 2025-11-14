import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


type Availability =
  | 'available'
  | 'booked'
  | 'unknown'
  | 'vacation'
  | 'unavailable';

interface PersonAvailability {
  name: string;
  availability: { [date: string]: Availability };
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  people: PersonAvailability[] = [];
  filteredPeople: PersonAvailability[] = [];
  dates: string[] = [];
  searchTerm = '';
  sortBy = 'name';
  startDate: string = new Date().toISOString().split('T')[0];
  user: any;
constructor(private auth: AuthService, private router: Router) {}

  summary = {
    available: 0,
    booked: 0,
    unknown: 0,
    vacation: 0,
    unavailable: 0
  };

  statuses: Availability[] = [
    'available',
    'booked',
    'unknown',
    'vacation',
    'unavailable'
  ];
  loggedInUser: string | null = '';

  ngOnInit() {
        this.user = this.auth.getLoggedUser();
    this.generateDates();
    this.loadPeople();
    this.filteredPeople = [...this.people];
    this.updateSummary();
  }

  generateDates() {
  this.dates = [];
  const start = new Date(this.startDate);
  for (let i = 0; i < 14; i++) { 
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }); 
    const dayNum = date.getDate(); // 13
    const month = date.toLocaleDateString('en-US', { month: 'short' }); 
    this.dates.push(`${dayName} ${dayNum} ${month}`);
  }
}
logout() {
  this.auth.logout();
  this.router.navigate(['/login']);
}

  loadPeople() {
      const logName = this.user?.fullname || "Unknown User";
    this.people = [
      { name: logName, availability: {} },  
      { name: 'Sathya', availability: {} },
      { name: 'surendhar', availability: {} },
      { name: 'Charlie', availability: {} },
      { name: 'Praveen', availability: {} },
      { name: 'Ram', availability: {} }
    ];
    this.resetAvailability();
  }

  resetAvailability() {
    this.people.forEach(person => {
      this.dates.forEach(date => {
        if (!person.availability[date]) {
          person.availability[date] = 'unknown';
        }
      });
    });
    this.updateSummary();
  }

  cycleStatus(person: PersonAvailability, date: string) {
    const current = person.availability[date];
    const currentIndex = this.statuses.indexOf(current);
    const nextIndex = (currentIndex + 1) % this.statuses.length;
    person.availability[date] = this.statuses[nextIndex];
    this.updateSummary();
  }

  getStatusLabel(status: Availability): string {
    switch (status) {
      case 'available':
        return 'A';
      case 'booked':
        return 'B';
      case 'unknown':
        return '';
      case 'vacation':
        return 'V';
      case 'unavailable':
        return 'UA';
      default:
        return '';
    }
  }

  search() {
    this.filteredPeople = this.people.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  sort() {
    if (this.sortBy === 'name') {
      this.filteredPeople.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'available') {
      this.filteredPeople.sort((a, b) => {
        const aCount = Object.values(a.availability).filter(v => v === 'available').length;
        const bCount = Object.values(b.availability).filter(v => v === 'available').length;
        return bCount - aCount;
      });
    }
  }

  onDateChange() {
    this.generateDates();
    this.resetAvailability();
  }

  updateSummary() {
    const counts = {
      available: 0,
      booked: 0,
      unknown: 0,
      vacation: 0,
      unavailable: 0
    };

    this.people.forEach(p => {
      Object.values(p.availability).forEach(status => {
        counts[status]++;
      });
    });

    this.summary = counts;
  }
}
