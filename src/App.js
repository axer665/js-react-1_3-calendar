import Calendar from './components/Calendar';
import moment from 'moment';
import 'moment/locale/ru';

function App() {
    moment.locale('ru');
    const now = new Date();

    return <Calendar date={now} />;
}

export default App;
