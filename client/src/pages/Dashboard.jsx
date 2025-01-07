// import React from 'react';
// import { Bell, Calendar, MessageSquare, Play, Gift, HelpCircle, Search, Clock } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// const Dashboard = () => {
//   const upcomingEvents = [
//     { id: 1, title: "Tech Conference 2025", time: "10:00 AM", countdown: "2 days" },
//     { id: 2, title: "Leadership Summit", time: "2:00 PM", countdown: "5 days" }
//   ];

//   const liveEvents = [
//     { id: 1, title: "AI Workshop", attendees: 234 },
//     { id: 2, title: "Networking Session", attendees: 156 }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       {/* Top Navigation */}
//       <nav className="bg-white rounded-lg p-4 mb-6 flex items-center justify-between shadow-sm">
//         <div className="text-xl font-bold text-blue-600">EventPro</div>
//         <div className="flex items-center gap-4">
//           <Search className="w-5 h-5 text-gray-500" />
//           <Bell className="w-5 h-5 text-gray-500" />
//           <img src="/api/placeholder/40/40" alt="Profile" className="w-10 h-10 rounded-full" />
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Welcome Card */}
//           <Card>
//             <CardHeader>
//               <CardTitle>
//                 <div className="flex justify-between items-center">
//                   <h1 className="text-2xl">Welcome back, Sarah!</h1>
//                   <div className="text-sm text-blue-600">80% Profile Complete</div>
//                 </div>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-4 gap-4">
//                 <button className="p-3 bg-blue-50 rounded-lg text-center">
//                   <Calendar className="w-6 h-6 mx-auto text-blue-600 mb-2" />
//                   <span className="text-sm">Calendar</span>
//                 </button>
//                 <button className="p-3 bg-purple-50 rounded-lg text-center">
//                   <MessageSquare className="w-6 h-6 mx-auto text-purple-600 mb-2" />
//                   <span className="text-sm">Messages</span>
//                 </button>
//                 <button className="p-3 bg-green-50 rounded-lg text-center">
//                   <Play className="w-6 h-6 mx-auto text-green-600 mb-2" />
//                   <span className="text-sm">Live Events</span>
//                 </button>
//                 <button className="p-3 bg-orange-50 rounded-lg text-center">
//                   <Gift className="w-6 h-6 mx-auto text-orange-600 mb-2" />
//                   <span className="text-sm">Rewards</span>
//                 </button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Live Events */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
//                 Live Now
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {liveEvents.map(event => (
//                   <div key={event.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
//                     <div>
//                       <h3 className="font-medium">{event.title}</h3>
//                       <p className="text-sm text-gray-500">{event.attendees} attendees</p>
//                     </div>
//                     <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//                       Join Now
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Upcoming Events */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Clock className="w-5 h-5" />
//                 Upcoming Events
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {upcomingEvents.map(event => (
//                   <div key={event.id} className="border-l-4 border-blue-600 pl-4">
//                     <h3 className="font-medium">{event.title}</h3>
//                     <p className="text-sm text-gray-500">{event.time}</p>
//                     <p className="text-xs text-blue-600">Starts in {event.countdown}</p>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Help Card */}
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center gap-4">
//                 <HelpCircle className="w-8 h-8 text-blue-600" />
//                 <div>
//                   <h3 className="font-medium">Need Help?</h3>
//                   <p className="text-sm text-gray-500">Our support team is here</p>
//                 </div>
//               </div>
//               <button className="w-full mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg">
//                 Contact Support
//               </button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';
import { Bell, Calendar, MessageSquare, Play, Gift, HelpCircle, Search, Clock } from 'lucide-react';


const Dashboard = () => {
  const upcomingEvents = [
    { id: 1, title: "Tech Conference 2025", time: "10:00 AM", countdown: "2 days" },
    { id: 2, title: "Leadership Summit", time: "2:00 PM", countdown: "5 days" }
  ];

  const liveEvents = [
    { id: 1, title: "AI Workshop", attendees: 234 },
    { id: 2, title: "Networking Session", attendees: 156 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <nav className="bg-white rounded-lg p-4 mb-6 flex items-center justify-between shadow-sm">
        <div className="text-xl font-bold text-blue-600">EventPro</div>
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 text-gray-500" />
          <Bell className="w-5 h-5 text-gray-500" />
          <img src="/api/placeholder/40/40" alt="Profile" className="w-10 h-10 rounded-full" />
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DashboardCard>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl">Welcome back, Sarah!</h1>
              <div className="text-sm text-blue-600">80% Profile Complete</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <button className="p-3 bg-blue-50 rounded-lg text-center">
                <Calendar className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                <span className="text-sm">Calendar</span>
              </button>
              <button className="p-3 bg-purple-50 rounded-lg text-center">
                <MessageSquare className="w-6 h-6 mx-auto text-purple-600 mb-2" />
                <span className="text-sm">Messages</span>
              </button>
              <button className="p-3 bg-green-50 rounded-lg text-center">
                <Play className="w-6 h-6 mx-auto text-green-600 mb-2" />
                <span className="text-sm">Live Events</span>
              </button>
              <button className="p-3 bg-orange-50 rounded-lg text-center">
                <Gift className="w-6 h-6 mx-auto text-orange-600 mb-2" />
                <span className="text-sm">Rewards</span>
              </button>
            </div>
          </DashboardCard>

          <DashboardCard>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-semibold">Live Now</h2>
            </div>
            <div className="space-y-4">
              {liveEvents.map(event => (
                <div key={event.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.attendees} attendees</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Join Now
                  </button>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        <div className="space-y-6">
          <DashboardCard>
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.time}</p>
                  <p className="text-xs text-blue-600">Starts in {event.countdown}</p>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard>
            <div className="flex items-center gap-4">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-medium">Need Help?</h3>
                <p className="text-sm text-gray-500">Our support team is here</p>
              </div>
            </div>
            <button className="w-full mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg">
              Contact Support
            </button>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;