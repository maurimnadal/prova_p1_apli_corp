import EventList from '../components/EventList';
import '../index.css';

export default function Events() {
  return (
    <div className="container">
      <header>
        <h1>Eventos</h1>
      </header>
      <EventList />
    </div>
  );
}
