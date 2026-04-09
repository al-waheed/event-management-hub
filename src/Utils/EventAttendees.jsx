import { format } from "date-fns";

const EventAttendees = ({ invites = [] }) => {
  if (!invites.length) {
    return (
      <div className="mt-6">
        <h4 className="font-semibold mb-3 text-primary">Event Invites</h4>
        <p className="text-sm text-gray-500">No attendees yet for this event.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h4 className="font-semibold mb-3 text-primary">Event Invites</h4>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
              <th className="px-4 py-3 rounded-l-md">EMAIL</th>
              <th className="px-4 py-3">DATE</th>
              <th className="px-4 py-3 rounded-r-md">STATUS</th>
            </tr>
          </thead>

          <tbody>
            {invites.map((invite) => (
              <tr key={invite.id} className="bg-white shadow-sm text-sm">
                <td className="px-4 py-3 rounded-l-md text-gray-700">
                  {invite.email}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {invite.invitedAt?.seconds
                    ? format(new Date(invite.invitedAt.seconds * 1000), "dd MMM yyyy")
                    : "-"}
                </td>

                <td className="px-4 py-3 rounded-r-md">
                  <span
                    className={`inline-block px-3 py-1 uppercase text-xs font-medium rounded-full
                  ${
                    invite.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : invite.status === "declined"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                  >
                    {invite.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventAttendees;
