import moment from 'moment';
import 'moment/locale/ru';

function Calendar(props) {
    const { date } = props;
    const months = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
    ];

    moment.updateLocale('ru', { week: { dow: 1 } });
    const startDay = moment().startOf('month').startOf('week');
    const startDayGetTime = new Date(startDay).getTime();

    const endDay = moment().endOf('month').endOf('week');
    const endDayGetTime = new Date(endDay).getTime();

    const monthDuration = Math.round(
        (endDayGetTime - startDayGetTime) / 1000 / 60 / 60 / 24
    );

    const tableCalendar = [];
    const day = startDay.clone();

    while (!day.isAfter(endDay)) {
        tableCalendar.push(day.clone());
        day.add(1, 'day');
    }

    const cols = 7;
    const rows = Math.ceil(monthDuration / cols);

    let tbody = [];
    let tr;
    let count = 0;

    for (let row = 0; row < rows; row++) {
        tr = [];
        for (let col = 0; col < cols; col++) {
            if (tableCalendar[count].format('MM') !== moment(date).format('MM')) {
                tr.push(
                    <td className="ui-datepicker-other-month"
                        key={Math.random().toString()}
                    >
                        {tableCalendar[count].format('DD')}
                    </td>
                );
            } else if (
                tableCalendar[count].format('DD') === moment(date).format('DD')
            ) {
                tr.push(
                    <td className="ui-datepicker-today" key={Math.random().toString()}>
                        {tableCalendar[count].format('DD')}
                    </td>
                );
            } else {
                tr.push(
                    <td key={Math.random().toString()}>
                        {tableCalendar[count].format('DD')}
                    </td>
                );
            }
            count++;
        }
        tbody.push(<tr key={Math.random().toString()}>{tr}</tr>);
    }

    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">
                    {moment(date).format('dddd')}
                </div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">
                        {moment(date).format('D')}
                    </div>
                    <div className="ui-datepicker-material-month">
                        {months[date.getMonth()]}
                    </div>
                    <div className="ui-datepicker-material-year">
                        {moment(date).format('YYYY')}
                    </div>
                </div>
            </div>

            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">
                        {moment(date).format('MMMM')}
                    </span>
                    &nbsp;
                    <span className="ui-datepicker-year">
                        {moment(date).format('YYYY')}
                    </span>
                </div>
            </div>

            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className="ui-datepicker-week-end" />
                    <col className="ui-datepicker-week-end" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">
                            Пн
                        </th>
                        <th scope="col" title="Вторник">
                            Вт
                        </th>
                        <th scope="col" title="Среда">
                            Ср
                        </th>
                        <th scope="col" title="Четверг">
                            Чт
                        </th>
                        <th scope="col" title="Пятница">
                            Пт
                        </th>
                        <th scope="col" title="Суббота">
                            Сб
                        </th>
                        <th scope="col" title="Воскресенье">
                            Вс
                        </th>
                    </tr>
                </thead>
                <tbody>{tbody}</tbody>
            </table>
        </div>
    );
}

export default Calendar;
