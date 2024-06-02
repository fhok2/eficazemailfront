import React from 'react';

const UserTable = () => {
  const users = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', status: 'Active', role: 'Member' },
    { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Inactive', role: 'Admin' },
    // Adicione mais usuários conforme necessário
  ];

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-800 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b border-gray-200 bg-white hover:bg-gray-100">
                    <td className="px-5 py-5 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
                    </td>
                    <td className="px-5 py-5 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{user.title}</p>
                    </td>
                    <td className="px-5 py-5 text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                          user.status === 'Active'
                            ? 'text-green-900'
                            : 'text-red-900'
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 ${
                            user.status === 'Active'
                              ? 'bg-green-200'
                              : 'bg-red-200'
                          } opacity-50 rounded-full`}
                        ></span>
                        <span className="relative">{user.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{user.role}</p>
                    </td>
                    <td className="px-5 py-5 text-sm text-center">
                      <button
                        type="button"
                        className="inline-block text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          className="h-6 w-6 fill-current"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 7c.552 0 1 .448 1 1v8c0 .552-.448 1-1 1s-1-.448-1-1V8c0-.552.448-1 1-1zM7 12c.552 0 1 .448 1 1v3c0 .552-.448 1-1 1s-1-.448-1-1v-3c0-.552.448-1 1-1zm10 0c.552 0 1 .448 1 1v3c0 .552-.448 1-1 1s-1-.448-1-1v-3c0-.552.448-1 1-1z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;