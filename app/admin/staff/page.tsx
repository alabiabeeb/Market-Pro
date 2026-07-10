"use client";

import { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Shield,
  UserCog,
  UserPlus,
  X,
  Check,
  Loader2,
  AlertCircle,
  Crown,
  UserCheck,
  Clock
} from "lucide-react";
import Link from "next/link";

interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "manager" | "staff";
  status: "active" | "invited" | "suspended";
  avatar?: string;
  joinedDate: string;
  lastActive?: string;
  permissions: string[];
}

// ── Staff Modal ──
function StaffModal({
  staff,
  onClose,
  onSave,
  isEditing
}: {
  staff?: Staff | null;
  onClose: () => void;
  onSave: (data: any) => void;
  isEditing: boolean;
}) {
  const [form, setForm] = useState({
    name: staff?.name || "",
    email: staff?.email || "",
    phone: staff?.phone || "",
    role: staff?.role || "staff",
    status: staff?.status || "active",
    permissions: staff?.permissions || ["view_orders", "view_products"]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const rolePermissions = {
    admin: ["all"],
    manager: [
      "view_orders",
      "manage_orders",
      "view_products",
      "manage_products",
      "view_customers",
      "manage_customers",
      "view_reports"
    ],
    staff: [
      "view_orders",
      "view_products",
      "view_customers"
    ]
  };

  const handleRoleChange = (role: string) => {
    setForm({
      ...form,
      role: role as any,
      permissions: rolePermissions[role as keyof typeof rolePermissions] || []
    });
  };

  const togglePermission = (permission: string) => {
    if (form.role === "admin") return;
    setForm({
      ...form,
      permissions: form.permissions.includes(permission)
        ? form.permissions.filter(p => p !== permission)
        : [...form.permissions, permission]
    });
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onSave(form);
      setIsLoading(false);
    }, 1000);
  };

  const allPermissions = [
    { id: "view_orders", label: "View Orders" },
    { id: "manage_orders", label: "Manage Orders" },
    { id: "view_products", label: "View Products" },
    { id: "manage_products", label: "Manage Products" },
    { id: "view_customers", label: "View Customers" },
    { id: "manage_customers", label: "Manage Customers" },
    { id: "view_reports", label: "View Reports" },
    { id: "manage_staff", label: "Manage Staff" },
    { id: "manage_settings", label: "Manage Settings" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {isEditing ? "Edit Staff" : "Add Staff Member"}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {isEditing ? "Update staff details and permissions" : "Invite a new team member"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40 transition-all ${
                  errors.name ? "border-red-300 focus:ring-red-100" : "border-gray-200 dark:border-gray-700"
                }`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40 transition-all ${
                  errors.email ? "border-red-300 focus:ring-red-100" : "border-gray-200 dark:border-gray-700"
                }`}
                placeholder="john@store.com"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40 transition-all ${
                  errors.phone ? "border-red-300 focus:ring-red-100" : "border-gray-200 dark:border-gray-700"
                }`}
                placeholder="+234 800 000 0000"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Role
              </label>
              <select
                value={form.role}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40 transition-all"
              >
                <option value="admin">Admin (Full Access)</option>
                <option value="manager">Manager</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>

          {/* Permissions */}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
              Permissions
            </label>
            {form.role === "admin" ? (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Crown size={14} className="text-[#C8F135]" />
                Admin has full access to all features
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {allPermissions.map((perm) => (
                  <label
                    key={perm.id}
                    className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={form.permissions.includes(perm.id)}
                      onChange={() => togglePermission(perm.id)}
                      className="w-3.5 h-3.5 rounded border-gray-300 dark:border-gray-600 text-[#0A2E1A] focus:ring-[#C8F135]"
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{perm.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Status (Edit mode only) */}
          {isEditing && (
            <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                Status
              </label>
              <div className="flex gap-3">
                {["active", "invited", "suspended"].map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={form.status === status}
                      onChange={() => setForm({ ...form, status: status as any })}
                      className="w-3.5 h-3.5 text-[#0A2E1A] focus:ring-[#C8F135]"
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-lg bg-[#0A2E1A] hover:bg-[#060F09] disabled:bg-gray-400 text-[#C8F135] text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {isEditing ? "Saving..." : "Inviting..."}
              </>
            ) : (
              <>
                <UserPlus size={16} />
                {isEditing ? "Save Changes" : "Send Invite"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirmation Modal ──
function DeleteModal({
  staff,
  onClose,
  onConfirm
}: {
  staff: Staff | null;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center mx-auto">
          <Trash2 size={20} className="text-red-500" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">Remove Staff Member?</h3>
          <p className="text-xs text-gray-400 mt-1">
            This will remove <span className="font-semibold text-gray-700 dark:text-gray-300">{staff?.name}</span> from your store. This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
          >
            Remove Staff
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──
export default function StaffManagementPage() {
  const [staffList, setStaffList] = useState<Staff[]>([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@store.com",
      phone: "+1 (555) 000-1234",
      role: "admin",
      status: "active",
      joinedDate: "2024-01-15",
      lastActive: "10 min ago",
      permissions: ["all"]
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah@store.com",
      phone: "+1 (555) 000-5678",
      role: "manager",
      status: "active",
      joinedDate: "2024-03-20",
      lastActive: "2 hours ago",
      permissions: ["view_orders", "manage_orders", "view_products", "manage_products", "view_customers", "manage_customers", "view_reports"]
    },
    {
      id: 3,
      name: "Mike Brown",
      email: "mike@store.com",
      phone: "+1 (555) 000-9012",
      role: "staff",
      status: "invited",
      joinedDate: "2024-06-01",
      lastActive: null,
      permissions: ["view_orders", "view_products", "view_customers"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const getRoleBadge = (role: string) => {
    switch(role) {
      case "admin": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "manager": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "staff": return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
      default: return "";
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "invited": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "suspended": return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
      default: return "";
    }
  };

  const getStatusDot = (status: string) => {
    switch(status) {
      case "active": return "bg-green-500";
      case "invited": return "bg-yellow-500";
      case "suspended": return "bg-red-500";
      default: return "bg-gray-400";
    }
  };

  const handleAddStaff = (data: any) => {
    const newStaff: Staff = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: "invited",
      joinedDate: new Date().toISOString().split("T")[0],
      permissions: data.permissions
    };
    setStaffList([...staffList, newStaff]);
    setShowAddModal(false);
  };

  const handleEditStaff = (data: any) => {
    if (!selectedStaff) return;
    setStaffList(
      staffList.map((s) =>
        s.id === selectedStaff.id
          ? {
              ...s,
              name: data.name,
              email: data.email,
              phone: data.phone,
              role: data.role,
              status: data.status,
              permissions: data.permissions
            }
          : s
      )
    );
    setShowEditModal(false);
    setSelectedStaff(null);
  };

  const handleDeleteStaff = () => {
    if (!selectedStaff) return;
    setStaffList(staffList.filter((s) => s.id !== selectedStaff.id));
    setShowDeleteModal(false);
    setSelectedStaff(null);
  };

  const filteredStaff = staffList.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || staff.role === filterRole;
    const matchesStatus = filterStatus === "all" || staff.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            Staff Management
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage your team members and their permissions
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A2E1A] hover:bg-[#060F09] text-[#C8F135] text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Staff
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Staff", value: staffList.length, icon: Users },
          { label: "Active", value: staffList.filter(s => s.status === "active").length, icon: UserCheck },
          { label: "Invited", value: staffList.filter(s => s.status === "invited").length, icon: Clock },
          { label: "Suspended", value: staffList.filter(s => s.status === "suspended").length, icon: AlertCircle },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={14} className="text-[#0A2E1A] dark:text-[#C8F135]" />
                <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="invited">Invited</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Staff
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Contact
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Role
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Joined
                </th>
                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filteredStaff.map((staff) => (
                <tr
                  key={staff.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C8F135]/20 flex items-center justify-center text-[#0A2E1A] text-xs font-bold">
                        {staff.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-800 dark:text-gray-200">
                          {staff.name}
                        </p>
                        {staff.lastActive && (
                          <p className="text-[10px] text-gray-400">Last active: {staff.lastActive}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-0.5">
                      <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Mail size={11} className="text-gray-400" />
                        {staff.email}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Phone size={11} className="text-gray-400" />
                        {staff.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium ${getRoleBadge(staff.role)}`}>
                      {staff.role === "admin" && <Crown size={10} />}
                      {staff.role === "manager" && <UserCog size={10} />}
                      {staff.role === "staff" && <UserCheck size={10} />}
                      {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium ${getStatusBadge(staff.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(staff.status)}`} />
                      {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                    {staff.joinedDate}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => {
                          setSelectedStaff(staff);
                          setShowEditModal(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedStaff(staff);
                          setShowDeleteModal(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredStaff.length === 0 && (
          <div className="py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
              <Users size={20} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">No staff members found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <StaffModal
          isEditing={false}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddStaff}
        />
      )}

      {showEditModal && selectedStaff && (
        <StaffModal
          staff={selectedStaff}
          isEditing={true}
          onClose={() => {
            setShowEditModal(false);
            setSelectedStaff(null);
          }}
          onSave={handleEditStaff}
        />
      )}

      {showDeleteModal && selectedStaff && (
        <DeleteModal
          staff={selectedStaff}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedStaff(null);
          }}
          onConfirm={handleDeleteStaff}
        />
      )}
    </div>
  );
}