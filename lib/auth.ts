// lib/auth.ts - Complete Auth Service

// ── EXPORT ALL TYPES ──
export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  role?: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  createdAt?: string;
}

export interface LoginResponse {
  success: boolean;
  user?: Omit<User, 'password'>;
  token?: string;
  error?: string;
}

export interface PasswordChangeResponse {
  success: boolean;
  error?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  user?: Omit<User, 'password'>;
  error?: string;
}

// ── Mock User Database ──
let MOCK_USERS: User[] = [
  {
    id: "1",
    email: "demo@marketpro.ng",
    name: "Demo User",
    password: "Demo@1234",
    role: "admin",
    avatar: "/avatar.jpg",
    bio: "Store administrator",
    phone: "+234 800 000 0000",
    createdAt: "2024-01-01"
  },
  {
    id: "2",
    email: "admin@marketpro.ng",
    name: "Admin User",
    password: "Admin@1234",
    role: "admin",
    bio: "System admin",
    phone: "+234 800 000 0001",
    createdAt: "2024-01-01"
  }
];

// ── Simulate API delay ──
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ── LOGIN ──
export async function login(email: string, password: string): Promise<LoginResponse> {
  await delay(1500);

  // ─── 🔄 REPLACE WITH BACKEND API ───
  // const response = await fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password })
  // });
  // return response.json();
  // ──────────────────────────────────

  const user = MOCK_USERS.find(u => u.email === email);
  
  if (user && user.password === password) {
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      user: userWithoutPassword,
      token: `mock-token-${Date.now()}`
    };
  }

  return {
    success: false,
    error: "Invalid email or password. Please try again."
  };
}

// ── SIGNUP ──
export async function signup(userData: {
  email: string;
  password: string;
  name: string;
  storeData?: any;
}): Promise<LoginResponse> {
  await delay(1500);

  // ─── 🔄 REPLACE WITH BACKEND API ───
  // const response = await fetch('/api/auth/signup', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(userData)
  // });
  // return response.json();
  // ──────────────────────────────────

  const existing = MOCK_USERS.find(u => u.email === userData.email);
  if (existing) {
    return {
      success: false,
      error: "User with this email already exists."
    };
  }

  const newUser: User = {
    id: String(MOCK_USERS.length + 1),
    email: userData.email,
    name: userData.name,
    password: userData.password,
    role: "admin",
    createdAt: new Date().toISOString()
  };

  MOCK_USERS.push(newUser);

  const { password: _, ...userWithoutPassword } = newUser;
  return {
    success: true,
    user: userWithoutPassword,
    token: `mock-token-${Date.now()}`
  };
}

// ── CHANGE PASSWORD ──
export async function changePassword(
  userId: string,
  oldPassword: string,
  newPassword: string
): Promise<PasswordChangeResponse> {
  await delay(1500);

  // ─── 🔄 REPLACE WITH BACKEND API ───
  // const response = await fetch('/api/auth/change-password', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   },
  //   body: JSON.stringify({ oldPassword, newPassword })
  // });
  // return response.json();
  // ──────────────────────────────────

  const user = MOCK_USERS.find(u => u.id === userId);
  
  if (!user) {
    return {
      success: false,
      error: "User not found."
    };
  }

  // Verify old password
  if (user.password !== oldPassword) {
    return {
      success: false,
      error: "Current password is incorrect."
    };
  }

  // Validate new password
  if (newPassword.length < 8) {
    return {
      success: false,
      error: "New password must be at least 8 characters."
    };
  }

  // Update password
  user.password = newPassword;
  
  const index = MOCK_USERS.findIndex(u => u.id === userId);
  if (index !== -1) {
    MOCK_USERS[index] = user;
  }

  return {
    success: true
  };
}

// ── GET CURRENT USER ──
export function getCurrentUser(): User | null {
  // ─── 🔄 REPLACE WITH BACKEND ───
  // const response = await fetch('/api/auth/me', {
  //   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  // });
  // return response.json();
  // ──────────────────────────────────
  
  const stored = localStorage.getItem('user');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

// ── LOGOUT ──
export async function logout(): Promise<void> {
  // ─── 🔄 REPLACE WITH BACKEND ───
  // await fetch('/api/auth/logout', { 
  //   method: 'POST',
  //   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  // });
  // ──────────────────────────────────
  
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  sessionStorage.removeItem('user');
}

// ── UPDATE USER PROFILE ──
export async function updateProfile(
  userId: string, 
  data: Partial<User>
): Promise<UpdateProfileResponse> {
  await delay(1000);

  // ─── 🔄 REPLACE WITH BACKEND API ───
  // const response = await fetch('/api/auth/update-profile', {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   },
  //   body: JSON.stringify(data)
  // });
  // return response.json();
  // ──────────────────────────────────

  const user = MOCK_USERS.find(u => u.id === userId);
  
  if (!user) {
    return {
      success: false,
      error: "User not found."
    };
  }

  // Update user data
  Object.assign(user, data);
  
  const index = MOCK_USERS.findIndex(u => u.id === userId);
  if (index !== -1) {
    MOCK_USERS[index] = user;
  }

  const { password: _, ...userWithoutPassword } = user;
  
  // Update stored user
  localStorage.setItem('user', JSON.stringify(userWithoutPassword));

  return {
    success: true,
    user: userWithoutPassword
  };
}