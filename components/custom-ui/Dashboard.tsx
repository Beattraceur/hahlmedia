import { analytics } from '@/lib/analytics';
import { getDate } from '@/lib/getDate';

//A custom tailwind Dashboard component that displays analytics traced in the radis database
export default async function Dashboard() {
  // Tracking history for 7 days
  const TRACKING_DAYS = 7;
  const pageviews = await analytics.retrieveDays('pageview', 7);
  // some calculations
  const totalPageviews = pageviews.reduce((acc, curr) => {
    return (
      acc +
      curr.events.reduce((acc, curr) => {
        return acc + Object.values(curr)[0]!;
      }, 0)
    );
  }, 0);
  const avgVisitorsPerDay = (totalPageviews / TRACKING_DAYS).toFixed(1);

  const amtVisitorsToday = pageviews
    .filter((ev) => ev.date === getDate())
    .reduce((acc, curr) => {
      return (
        acc +
        curr.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0)
      );
    }, 0);

  return (
    <div>
      <h2>Dashboard:</h2>
      <div className='bg-cyan-700 text-white p-24 flex flex-wrap justify-between'>
        <h4> Avg. visitors/day {avgVisitorsPerDay}</h4>
        <h4> Visitors today {amtVisitorsToday}</h4>
        <h4>
          Percentage
          {' ' +
            ((amtVisitorsToday / Number(avgVisitorsPerDay) - 1) * 100).toFixed(
              0
            ) +
            ' %'}
        </h4>
      </div>
    </div>
  );
}
