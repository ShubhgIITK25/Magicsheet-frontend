const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

function normalizeRole(role) {
	if (!role) return null;

	const normalized = String(role).toLowerCase();
	if (normalized === "coco") return "coco";
	if (normalized === "opc") return "opc";
	if (normalized === "apc") return "apc";

	return normalized;
}

export async function getLoginStatus() {
	try {
		const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
			method: "GET",
			credentials: "include",
			headers: {
				Accept: "application/json",
			},
		});

		if (!res.ok) {
			return { isLogin: false, role: null, user: null };
		}

		const data = await res.json();
		const role = normalizeRole(data.role || null);
		return {
			isLogin: true,
			role,
			user: data,
		};
	} catch {
		return { isLogin: false, role: null, user: null };
	}
}

export function roleHomePath(role) {
	const normalizedRole = normalizeRole(role);
    
	if (normalizedRole === "coco") return "/coco";
	if (normalizedRole === "apc") return "/apc";
	if (normalizedRole === "opc") return "/opc";
	return "/auth";
}
