import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSupport = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const updateStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`http://localhost:5001/api/support/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await res.json();
            if (data.success) {
                setReports(reports.map(r => r._id === id ? { ...r, status: newStatus } : r));
            }
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    const fetchReports = async () => {
        try {
            const res = await fetch('http://localhost:5001/api/support/all-reports');
            const json = await res.json();
            if (json.success) {
                setReports(json.data);
            }
        } catch (err) {
            console.error("Failed to fetch reports:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const filteredReports = filter === 'all'
        ? reports
        : reports.filter(r => r.type === filter);

    const [selectedReport, setSelectedReport] = useState(null);

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Support <span className="text-indigo-600">Command Center</span></h1>
                        <p className="text-slate-500 font-bold">Manage and resolve farmer & buyer grievances.</p>
                    </div>
                    <button onClick={() => navigate('/')} className="bg-white border-2 border-slate-200 px-6 py-3 rounded-2xl font-black text-slate-600 hover:border-indigo-300 transition-all">
                        ← Exit Admin
                    </button>
                </div>

                {/* Stats & Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-slate-50">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Total Reports</p>
                        <p className="text-4xl font-black text-slate-900">{reports.length}</p>
                    </div>
                    <div className="bg-indigo-50 p-8 rounded-[2.5rem] shadow-xl border-2 border-indigo-100">
                        <p className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-2">Pending</p>
                        <p className="text-4xl font-black text-indigo-600">{reports.filter(r => r.status === 'pending').length}</p>
                    </div>

                    <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-slate-50 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Filter View</p>
                            <div className="flex gap-2">
                                {['all', 'query', 'dispute'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reports List */}
                <div className="bg-white rounded-[3rem] shadow-2xl border-2 border-slate-50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900 text-white">
                                    <th className="p-8 font-black uppercase tracking-widest text-xs">Reporter</th>
                                    <th className="p-8 font-black uppercase tracking-widest text-xs">Type</th>
                                    <th className="p-8 font-black uppercase tracking-widest text-xs">Subject</th>
                                    <th className="p-8 font-black uppercase tracking-widest text-xs">Date</th>
                                    <th className="p-8 font-black uppercase tracking-widest text-xs">Status</th>
                                    <th className="p-8 font-black uppercase tracking-widest text-xs">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr><td colSpan="6" className="p-20 text-center font-black text-slate-300">Loading intelligence reports...</td></tr>
                                ) : filteredReports.length === 0 ? (
                                    <tr><td colSpan="6" className="p-20 text-center font-black text-slate-300">No reports found matching criteria.</td></tr>
                                ) : filteredReports.map(report => (
                                    <tr key={report._id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="p-8">
                                            <p className="font-black text-slate-900">{report.userName}</p>
                                            <p className="text-xs text-slate-400 font-bold">{report.userEmail || 'No Email'}</p>
                                        </td>
                                        <td className="p-8">
                                            <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${report.type === 'dispute' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                {report.type}
                                            </span>
                                        </td>
                                        <td className="p-8 max-w-xs">
                                            <p className="font-bold text-slate-700 truncate">{report.subject}</p>
                                        </td>
                                        <td className="p-8">
                                            <p className="text-sm font-bold text-slate-500">{new Date(report.createdAt).toLocaleDateString()}</p>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={report.status}
                                                    onChange={(e) => updateStatus(report._id, e.target.value)}
                                                    className={`bg-slate-100 border-none rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest outline-none cursor-pointer hover:bg-white hover:ring-2 transition-all shadow-sm ${report.status === 'resolved' ? 'text-emerald-600 ring-emerald-100' : report.status === 'in-progress' ? 'text-amber-600 ring-amber-100' : 'text-slate-600 ring-slate-200'}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="in-progress">In Progress</option>
                                                    <option value="resolved">Resolved</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <button
                                                onClick={() => setSelectedReport(report)}
                                                className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black hover:bg-indigo-600 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            {selectedReport && (
                <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedReport.type === 'dispute' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                    {selectedReport.type}
                                </span>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-2">{selectedReport.subject}</h3>
                            </div>
                            <button onClick={() => setSelectedReport(null)} className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-300 transition-all font-bold text-xl">✕</button>
                        </div>

                        <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Submitted By</label>
                                    <p className="font-bold text-slate-800 text-lg">{selectedReport.userName}</p>
                                    <p className="text-xs text-slate-500 font-bold">{selectedReport.userEmail}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date</label>
                                    <p className="font-bold text-slate-800 text-lg">{new Date(selectedReport.createdAt).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Report Details</label>
                                <p className="text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
                                    {selectedReport.details.message || selectedReport.details.details || selectedReport.details.issue || "No description provided."}
                                </p>
                                {selectedReport.details.orderId && (
                                    <div className="mt-4 pt-4 border-t border-slate-200">
                                        <p className="text-xs font-bold text-slate-500">Related Order ID: <span className="text-slate-800">{selectedReport.details.orderId}</span></p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Update Status</label>
                                <div className="flex gap-3">
                                    {['pending', 'in-progress', 'resolved'].map(s => (
                                        <button
                                            key={s}
                                            onClick={() => updateStatus(selectedReport._id, s)}
                                            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest border-2 transition-all ${selectedReport.status === s
                                                    ? (s === 'resolved' ? 'bg-emerald-600 border-emerald-600 text-white' : s === 'in-progress' ? 'bg-amber-500 border-amber-500 text-white' : 'bg-slate-600 border-slate-600 text-white')
                                                    : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSupport;
