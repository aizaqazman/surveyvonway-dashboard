// lib/user-stats.ts
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function getUserCount(): Promise<number> {
    try {
        const result = await sql`SELECT COUNT(*) FROM reviews`; 
        return Number(result[0].count);
    } catch (error) {
        console.error('Failed to fetch user count:', error);
        return 0;
    }
}

export async function getUserApproved() : Promise<number> {
    try {
        const result = await sql`SELECT COUNT(*) FROM reviews WHERE form_status = 'approved'`;
        return Number(result[0].count);
    } catch (error) {
        console.error('Failed to fetch approved user count:', error);
        return 0;
    }
}

export async function getUserRejected() : Promise<number> {
    try {
        const result = await sql`SELECT COUNT(*) FROM reviews WHERE form_status = 'rejected'`;
        return Number(result[0].count);
    } catch (error) {
        console.error('Failed to fetch rejected user count:', error);
        return 0;
    }
}
