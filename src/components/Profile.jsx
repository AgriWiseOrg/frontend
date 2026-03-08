import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Briefcase, Building, Key, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user }) => {
  const { t } = useTranslation();

    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        name: '',
        phone: '',
        address: '',
        farmSize: '',
        farmingType: '',
        companyName: '',
        businessType: '',
        department: '',
        employeeId: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch profile data
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/users/${user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.profile) {
                        setProfileData(prev => ({ ...prev, ...data.profile }));
                    }
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
        if (user?.id) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        try {
            const response = await fetch(`http://localhost:5001/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ profile: profileData })
            });
            if (response.ok) {
                setMessage('Profile updated successfully!');
            } else {
                setMessage('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('An error occurred while saving.');
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center bg-gray-50 text-green-700 font-bold">{t("Loading Profile...")}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-green-700 p-8 text-white relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-6 left-6 text-white hover:text-green-200 flex items-center gap-2"
                    >
                        {t("&larr; Back")}
                    </button>
                    <div className="flex flex-col items-center mt-6">
                        <div className="w-24 h-24 bg-white text-green-700 rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg border-4 border-green-200">
                            <User size={48} />
                        </div>
                        <h1 className="text-3xl font-bold">{profileData.name || 'Set your Name'}</h1>
                        <p className="text-green-100 mt-2 uppercase tracking-wide text-sm font-semibold">{user?.role} Account</p>
                        <p className="text-green-200 mt-1">{user?.email}</p>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{t("Basic Information")}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                                <User size={18} className="text-green-600" /> {t("Full Name")}
                            </label>
                            <input type="text" name="name" value={profileData.name} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder={t("John Doe")} />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                                <Phone size={18} className="text-green-600" /> {t("Phone Number")}
                            </label>
                            <input type="text" name="phone" value={profileData.phone} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder="+1 234 567 8900" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                                <MapPin size={18} className="text-green-600" /> {t("Address")}
                            </label>
                            <input type="text" name="address" value={profileData.address} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder={t("123 Farm Lane, Agriculture City")} />
                        </div>
                    </div>

                    {user?.role === 'farmer' && (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{t("Farm Details")}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                                        <MapPin size={18} className="text-green-600" /> {t("Farm Size (Acres)")}
                                    </label>
                                    <input type="text" name="farmSize" value={profileData.farmSize} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder={t("e.g., 50")} />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                                        <Briefcase size={18} className="text-green-600" /> {t("Farming Type")}
                                    </label>
                                    <select name="farmingType" value={profileData.farmingType} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-white">
                                        <option value="">{t("Select Type")}</option>
                                        <option value="Organic">{t("Organic")}</option>
                                        <option value="Traditional">{t("Traditional")}</option>
                                        <option value="Mixed">{t("Mixed")}</option>
                                        <option value="Commercial">{t("Commercial")}</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    )}

                    {user?.role === 'buyer' && (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{t("Business Details")}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                                        <Building size={18} className="text-green-600" /> {t("Company Name")}
                                    </label>
                                    <input type="text" name="companyName" value={profileData.companyName} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder={t("Fresh Foods Inc.")} />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                                        <Briefcase size={18} className="text-green-600" /> {t("Business Type")}
                                    </label>
                                    <select name="businessType" value={profileData.businessType} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-white">
                                        <option value="">{t("Select Type")}</option>
                                        <option value="Retailer">{t("Retailer")}</option>
                                        <option value="Wholesaler">{t("Wholesaler")}</option>
                                        <option value="Processor">{t("Processor")}</option>
                                        <option value="Exporter">{t("Exporter")}</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    )}

                    {user?.role === 'admin' && (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{t("Administrative Details")}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                                        <LayoutDashboard size={18} className="text-green-600" /> {t("Department")}
                                    </label>
                                    <input type="text" name="department" value={profileData.department} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder={t("e.g., Support, Management")} />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                                        <Key size={18} className="text-green-600" /> {t("Employee ID")}
                                    </label>
                                    <input type="text" name="employeeId" value={profileData.employeeId} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder={t("EMP-12345")} />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="flex items-center gap-4 mt-8">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                        {message && (
                            <span className={`font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
                                {message}
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
