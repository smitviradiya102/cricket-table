// // import { players } from '../data/playersData';
// // import { calculateAge } from '../utils/ageCalculator';

// // const Table = () => {
// //   return (
// //     <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
// //       <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
// //         International Cricketers
// //       </h2>
// //       <div className="overflow-auto">
// //         <table className="min-w-full border-collapse border border-gray-300 text-sm">
// //           {/* Main Header */}
// //           <thead>
// //             <tr className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white">
// //               <th rowSpan={2} className="border px-4 py-2 text-center">#</th>
// //               <th rowSpan={2} className="border px-4 py-2 text-left">Name</th>
// //               <th rowSpan={2} className="border px-4 py-2 text-center">Birthdate</th>
// //               <th rowSpan={2} className="border px-4 py-2 text-center">Age</th>
// //               <th colSpan={3} className="border px-4 py-2 text-center">Runs</th>
// //               <th colSpan={3} className="border px-4 py-2 text-center">Matches</th>
// //               <th rowSpan={2} className="border px-4 py-2 text-center">Role</th>
// //               <th rowSpan={2} className="border px-4 py-2 text-left">Teams</th>
// //             </tr>
// //             {/* Sub Header for formats */}
// //             <tr className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
// //               <th className="border px-2 py-1 text-center">T20</th>
// //               <th className="border px-2 py-1 text-center">ODI</th>
// //               <th className="border px-2 py-1 text-center">Test</th>
// //               <th className="border px-2 py-1 text-center">T20</th>
// //               <th className="border px-2 py-1 text-center">ODI</th>
// //               <th className="border px-2 py-1 text-center">Test</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {players.map((player, i) => {
// //               const age = calculateAge(player.birthdate);
// //               return (
// //                 <tr
// //                   key={i}
// //                   className={`${
// //                     i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
// //                   } hover:bg-emerald-100 transition-colors duration-200`}
// //                 >
// //                   <td className="border px-4 py-2 text-center">{i + 1}</td>
// //                   <td className="border px-4 py-2 font-medium text-gray-900">{player.name}</td>
// //                   <td className="border px-4 py-2 text-center">{player.birthdate}</td>
// //                   <td className="border px-4 py-2 text-center">{age}</td>

// //                   {/* Runs */}
// //                   <td className="border px-2 py-2 text-center">{player.runs.T20.toLocaleString()}</td>
// //                   <td className="border px-2 py-2 text-center">{player.runs.ODI.toLocaleString()}</td>
// //                   <td className="border px-2 py-2 text-center">{player.runs.Test.toLocaleString()}</td>

// //                   {/* Matches */}
// //                   <td className="border px-2 py-2 text-center">{player.matches.T20}</td>
// //                   <td className="border px-2 py-2 text-center">{player.matches.ODI}</td>
// //                   <td className="border px-2 py-2 text-center">{player.matches.Test}</td>

// //                   <td className="border px-4 py-2 text-center">{player.role}</td>
// //                   <td className="border px-4 py-2 text-left">{player.teams.join(', ')}</td>
// //                 </tr>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Table;

// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   flexRender,
//   createColumnHelper,
// } from '@tanstack/react-table';
// import { useState, useMemo } from 'react';
// import { players, playerExtras } from '../data/playersData';
// import { calculateAge } from '../utils/ageCalculator';
// import type { SortingState } from '@tanstack/react-table';

// const columnHelper = createColumnHelper<typeof players[0]>();

// const Table = () => {
//   const [globalFilter, setGlobalFilter] = useState('');
//   // const [sorting, setSorting] = useState([]);
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
//   const [expandedRow, setExpandedRow] = useState<{
//     id: string | null;
//     details: { birthPlace: string; interview: string } | null;
//   }>({ id: null, details: null });

//   const data = useMemo(() => players, []);

//   const handleRowClick = (rowId: string, playerName: string) => {
//     if (expandedRow.id === rowId) {
//       setExpandedRow({ id: null, details: null });
//     } else {
//       const playerExtra = playerExtras.find((p) => p.name === playerName);
//       setExpandedRow({
//         id: rowId,
//         details: playerExtra
//           ? { birthPlace: playerExtra.birthPlace, interview: playerExtra.interview }
//           : { birthPlace: 'Not available', interview: 'Not available' },
//       });
//     }
//   };

//   const columns = useMemo(
//     () => [
//       columnHelper.display({
//         id: 'index',
//         header: '#',
//         cell: ({ row }) => row.index + 1,
//       }),
//       columnHelper.accessor('name', {
//         header: 'Name',
//         cell: (info) => info.getValue(),
//       }),
//       columnHelper.accessor('birthdate', {
//         header: 'Birthdate',
//         cell: (info) => info.getValue(),
//       }),
//       columnHelper.display({
//         id: 'age',
//         header: 'Age',
//         cell: ({ row }) => calculateAge(row.original.birthdate),
//       }),
//       columnHelper.accessor((row) => row.runs.T20, {
//         id: 'runsT20',
//         header: 'Runs T20',
//         cell: (info) => info.getValue().toLocaleString(),
//       }),
//       columnHelper.accessor((row) => row.runs.ODI, {
//         id: 'runsODI',
//         header: 'Runs ODI',
//         cell: (info) => info.getValue().toLocaleString(),
//       }),
//       columnHelper.accessor((row) => row.runs.Test, {
//         id: 'runsTest',
//         header: 'Runs Test',
//         cell: (info) => info.getValue().toLocaleString(),
//       }),
//       columnHelper.accessor((row) => row.matches.T20, {
//         id: 'matchesT20',
//         header: 'Matches T20',
//       }),
//       columnHelper.accessor((row) => row.matches.ODI, {
//         id: 'matchesODI',
//         header: 'Matches ODI',
//       }),
//       columnHelper.accessor((row) => row.matches.Test, {
//         id: 'matchesTest',
//         header: 'Matches Test',
//       }),
//       columnHelper.accessor('role', {
//         header: 'Role',
//         cell: (info) => info.getValue(),
//       }),
//       columnHelper.accessor((row) => row.teams.join(', '), {
//         id: 'teams',
//         header: 'Teams',
//       }),
//     ],
//     []
//   );

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       globalFilter,
//       sorting,
//       pagination,
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     onSortingChange: setSorting,
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
//         International Cricketers
//       </h2>

//       {/* Global Search */}
//       <div className="mb-4 text-right">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={globalFilter ?? ''}
//           onChange={(e) => setGlobalFilter(e.target.value)}
//           className="border border-gray-300 rounded px-3 py-1 shadow-sm"
//         />
//       </div>

//       {/* Table */}
//       <div className="overflow-auto">
//         <table className="min-w-full border-collapse border border-gray-300 text-sm">
//           <thead>
//             <tr className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white">
//               {table.getHeaderGroups()[0].headers.slice(0, 4).map((header) => (
//                 <th
//                   key={header.id}
//                   rowSpan={2}
//                   className="border px-4 py-2 text-center cursor-pointer select-none"
//                   onClick={header.column.getToggleSortingHandler()}
//                 >
//                   {flexRender(header.column.columnDef.header, header.getContext())}
//                   {header.column.getIsSorted() === 'asc'
//                     ? ' ▲'
//                     : header.column.getIsSorted() === 'desc'
//                     ? ' ▼'
//                     : ''}
//                 </th>
//               ))}
//               <th colSpan={3} className="border px-4 py-2 text-center">
//                 Runs
//               </th>
//               <th colSpan={3} className="border px-4 py-2 text-center">
//                 Matches
//               </th>
//               <th rowSpan={2} className="border px-4 py-2 text-center">
//                 Role
//               </th>
//               <th rowSpan={2} className="border px-4 py-2 text-left">
//                 Teams
//               </th>
//             </tr>
//             <tr className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
//               {table.getHeaderGroups()[0].headers.slice(4, 10).map((header) => (
//                 <th
//                   key={header.id}
//                   className="border px-2 py-1 text-center cursor-pointer select-none"
//                   onClick={header.column.getToggleSortingHandler()}
//                 >
//                   {flexRender(header.column.columnDef.header, header.getContext())}
//                   {header.column.getIsSorted() === 'asc'
//                     ? ' ▲'
//                     : header.column.getIsSorted() === 'desc'
//                     ? ' ▼'
//                     : ''}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map((row, i) => (
//               <>
//                 <tr
//                   key={row.id}
//                   onClick={() => handleRowClick(row.id, row.original.name)}
//                   className={`${
//                     i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
//                   } hover:bg-emerald-100 transition-colors duration-200 cursor-pointer`}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id} className="border px-2 py-2 text-center">
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </td>
//                   ))}
//                 </tr>
//                 {expandedRow.id === row.id && expandedRow.details && (
//                   <tr className="bg-emerald-50">
//                     <td colSpan={13} className="border px-4 py-4 text-left">
//                       <div className="text-sm leading-6">
//                         <strong>Birthplace:</strong> {expandedRow.details.birthPlace} <br />
//                         <strong>Interview Quote:</strong> "{expandedRow.details.interview}"
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-between mt-4 text-sm">
//         <button
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//           className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span>
//           Page{' '}
//           <strong>
//             {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//           </strong>
//         </span>
//         <button
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//           className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Table;

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';
import { players, playerExtras } from '../data/playersData';
import { calculateAge } from '../utils/ageCalculator';
import type { SortingState, ColumnFiltersState } from '@tanstack/react-table';

const columnHelper = createColumnHelper<typeof players[0]>();

const Table = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [expandedRow, setExpandedRow] = useState<{
    id: string | null;
    details: { birthPlace: string; interview: string } | null;
  }>({ id: null, details: null });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const data = useMemo(() => players, []);

  const uniqueCountries = useMemo(() => {
    const countries = new Set<string>();
    players.forEach((player) => {
      player.teams.forEach((team) => countries.add(team));
    });
    return ['All', ...Array.from(countries).sort()];
  }, []);

  const uniqueYears = useMemo(() => {
    const years = new Set<string>();
    players.forEach((player) => {
      const year = player.birthdate.split('-')[0];
      years.add(year);
    });
    return ['All', ...Array.from(years).sort()];
  }, []);

  const handleRowClick = (rowId: string, playerName: string) => {
    if (expandedRow.id === rowId) {
      setExpandedRow({ id: null, details: null });
    } else {
      const playerExtra = playerExtras.find((p) => p.name === playerName);
      setExpandedRow({
        id: rowId,
        details: playerExtra
          ? { birthPlace: playerExtra.birthPlace, interview: playerExtra.interview }
          : { birthPlace: 'Not available', interview: 'Not available' },
      });
    }
  };

  // Helper function to create header with min/max inputs using TanStack Table's column filters
  const createHeaderWithFilters = (column: any, label: string) => {
    const filterValue = (column.getFilterValue() as { min: number | ''; max: number | '' }) || { min: '', max: '' };

    return (
      <div className="flex flex-col items-center">
        <span
          onClick={column.getToggleSortingHandler()}
          className="cursor-pointer select-none"
        >
          {label}
          {column.getIsSorted() === 'asc' ? ' ▲' : column.getIsSorted() === 'desc' ? ' ▼' : ''}
        </span>
        <div className="flex gap-1 mt-1">
          <input
            type="number"
            placeholder="Min"
            value={filterValue.min}
            onChange={(e) => {
              const newValue = e.target.value === '' ? '' : Number(e.target.value);
              column.setFilterValue({
                ...filterValue,
                min: newValue,
              });
            }}
            className="border border-gray-300 rounded px-1 py-0.5 text-xs w-16"
            style={{ pointerEvents: 'auto', zIndex: 1 }}
          />
          <input
            type="number"
            placeholder="Max"
            value={filterValue.max}
            onChange={(e) => {
              const newValue = e.target.value === '' ? '' : Number(e.target.value);
              column.setFilterValue({
                ...filterValue,
                max: newValue,
              });
            }}
            className="border border-gray-300 rounded px-1 py-0.5 text-xs w-16"
            style={{ pointerEvents: 'auto', zIndex: 1 }}
          />
        </div>
      </div>
    );
  };

  // Filter function for min/max ranges
  const rangeFilterFn = (
    row: any,
    columnId: string,
    filterValue: { min: number | ''; max: number | '' }
  ) => {
    const { min, max } = filterValue;
    const value = row.getValue(columnId);
    const hasMin = min !== '';
    const hasMax = max !== '';

    if (!hasMin && !hasMax) return true;
    if (hasMin && !hasMax) return value >= (min as number);
    if (!hasMin && hasMax) return value <= (max as number);
    return value >= (min as number) && value <= (max as number);
  };

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'index',
        header: '#',
        cell: ({ row }) => row.index + 1,
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('birthdate', {
        header: 'Birthdate',
        cell: (info) => info.getValue(),
        filterFn: (row, _columnId, filterValue) => {
          if (!filterValue || filterValue === 'All') return true;
          const year = row.original.birthdate.split('-')[0];
          return year === filterValue;
        },
      }),
      columnHelper.display({
        id: 'age',
        header: 'Age',
        cell: ({ row }) => calculateAge(row.original.birthdate),
      }),
      columnHelper.accessor((row) => row.runs.T20, {
        id: 'runsT20',
        header: ({ column }) => createHeaderWithFilters(column, 'Runs T20'),
        cell: (info) => info.getValue().toLocaleString(),
        filterFn: rangeFilterFn,
      }),
      columnHelper.accessor((row) => row.runs.ODI, {
        id: 'runsODI',
        header: ({ column }) => createHeaderWithFilters(column, 'Runs ODI'),
        cell: (info) => info.getValue().toLocaleString(),
        filterFn: rangeFilterFn,
      }),
      columnHelper.accessor((row) => row.runs.Test, {
        id: 'runsTest',
        header: ({ column }) => createHeaderWithFilters(column, 'Runs Test'),
        cell: (info) => info.getValue().toLocaleString(),
        filterFn: rangeFilterFn,
      }),
      columnHelper.accessor((row) => row.matches.T20, {
        id: 'matchesT20',
        header: ({ column }) => createHeaderWithFilters(column, 'Matches T20'),
        cell: (info) => info.getValue(),
        filterFn: rangeFilterFn,
      }),
      columnHelper.accessor((row) => row.matches.ODI, {
        id: 'matchesODI',
        header: ({ column }) => createHeaderWithFilters(column, 'Matches ODI'),
        cell: (info) => info.getValue(),
        filterFn: rangeFilterFn,
      }),
      columnHelper.accessor((row) => row.matches.Test, {
        id: 'matchesTest',
        header: ({ column }) => createHeaderWithFilters(column, 'Matches Test'),
        cell: (info) => info.getValue(),
        filterFn: rangeFilterFn,
      }),
      columnHelper.accessor('role', {
        header: 'Role',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => row.teams.join(', '), {
        id: 'teams',
        header: 'Teams',
        filterFn: (row, _columnId, filterValue) => {
          if (!filterValue || filterValue === 'All') return true;
          return row.original.teams.includes(filterValue);
        },
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
      pagination,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <h2 className="text-3xl font-semibold mb-4 text-center bg-gradient-to-r from-teal-600 to-emerald-700 text-white py-2 rounded"> 
        International Cricketers
      </h2>

    <div className="mb-4 flex justify-between items-center gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by name..."
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 shadow-sm"
        />
        <select
          value={(columnFilters.find((f) => f.id === 'teams')?.value as string) || 'All'}
          onChange={(e) =>
            setColumnFilters((prev) => {
              const others = prev.filter((f) => f.id !== 'teams');
              return e.target.value === 'All'
                ? others
                : [...others, { id: 'teams', value: e.target.value }];
            })
          }
          className="border border-gray-300 rounded px-3 py-1 shadow-sm ml-[600px]"
        >
          {uniqueCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          value={(columnFilters.find((f) => f.id === 'birthdate')?.value as string) || 'All'}
          onChange={(e) =>
            setColumnFilters((prev) => {
              const others = prev.filter((f) => f.id !== 'birthdate');
              return e.target.value === 'All'
                ? others
                : [...others, { id: 'birthdate', value: e.target.value }];
            })
          }
          className="border border-gray-300 rounded px-3 py-1 shadow-sm"
        >
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white">
              {table.getHeaderGroups()[0].headers.slice(0, 4).map((header) => (
                <th
                  key={header.id}
                  rowSpan={2}
                  className="border px-4 py-2 text-center cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === 'asc'
                    ? ' ▲'
                    : header.column.getIsSorted() === 'desc'
                    ? ' ▼'
                    : ''}
                </th>
              ))}
              <th colSpan={3} className="border px-4 py-2 text-center">
                Runs
              </th>
              <th colSpan={3} className="border px-4 py-2 text-center">
                Matches
              </th>
              <th rowSpan={2} className="border px-4 py-2 text-center">
                Role
              </th>
              <th rowSpan={2} className="border px-4 py-2 text-left">
                Teams
              </th>
            </tr>
            <tr className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
              {table.getHeaderGroups()[0].headers.slice(4, 10).map((header) => (
                <th key={header.id} className="border px-2 py-1 text-center">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <>
                <tr
                  key={row.id}
                  onClick={() => handleRowClick(row.id, row.original.name)}
                  className={`${
                    i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-emerald-100 transition-colors duration-200 cursor-pointer`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border px-2 py-2 text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
                {expandedRow.id === row.id && expandedRow.details && (
                  <tr className="bg-emerald-50">
                    <td colSpan={13} className="border px-4 py-4 text-left">
                      <div className="text-sm leading-6">
                        <strong>Birthplace:</strong> {expandedRow.details.birthPlace} <br />
                        <strong>Interview Quote:</strong> "{expandedRow.details.interview}"
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 border border-gray-300 rounded bg-gradient-to-r from-teal-600 to-emerald-700 text-white hover:bg-emerald-100 transition-colors duration-200 "
        >
          Previous
        </button>
        <span className="px-3 py-1 bg-gray-50 rounded hover:bg-emerald-100 transition-colors duration-200">
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 border border-gray-300 rounded bg-gradient-to-r from-teal-600 to-emerald-700 text-white hover:bg-emerald-100 transition-colors duration-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;