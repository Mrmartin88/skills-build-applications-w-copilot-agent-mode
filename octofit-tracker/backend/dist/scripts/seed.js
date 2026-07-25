"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const workout_1 = __importDefault(require("../models/workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.default.deleteMany({}),
            team_1.default.deleteMany({}),
            activity_1.default.deleteMany({}),
            leaderboard_1.default.deleteMany({}),
            workout_1.default.deleteMany({}),
        ]);
        const teamAlpha = await team_1.default.create({
            name: 'Alpha Runners',
            description: 'A team focused on endurance and community challenges.',
            members: [],
        });
        const teamVelocity = await team_1.default.create({
            name: 'Velocity Squad',
            description: 'High intensity training and competitive workouts.',
            members: [],
        });
        const users = await user_1.default.create([
            { name: 'Alicia Torres', email: 'alicia@example.com', role: 'coach', joinedAt: new Date('2025-09-01'), team: teamAlpha._id },
            { name: 'Marcus Lee', email: 'marcus@example.com', role: 'member', joinedAt: new Date('2026-02-15'), team: teamAlpha._id },
            { name: 'Sara Patel', email: 'sara@example.com', role: 'member', joinedAt: new Date('2026-03-12'), team: teamVelocity._id },
            { name: 'Omar Ruiz', email: 'omar@example.com', role: 'member', joinedAt: new Date('2026-04-02'), team: teamVelocity._id },
        ]);
        teamAlpha.members = [users[0]._id, users[1]._id];
        teamVelocity.members = [users[2]._id, users[3]._id];
        await teamAlpha.save();
        await teamVelocity.save();
        const workouts = await workout_1.default.create([
            {
                title: 'Full Body Circuit',
                description: 'A 30-minute circuit workout to improve strength and endurance.',
                difficulty: 'intermediate',
                durationMinutes: 30,
                exercises: ['Push-ups', 'Squats', 'Plank', 'Lunges', 'Burpees'],
            },
            {
                title: 'Morning Recovery Flow',
                description: 'A gentle routine to recover from intense workouts and increase mobility.',
                difficulty: 'beginner',
                durationMinutes: 20,
                exercises: ['Cat-Cow', 'Child Pose', 'Hip Circles', 'Downward Dog', 'Deep Breathing'],
            },
            {
                title: 'HIIT Power Session',
                description: 'A fast-paced high intensity interval training session for calorie burn.',
                difficulty: 'advanced',
                durationMinutes: 25,
                exercises: ['Sprint Intervals', 'Mountain Climbers', 'Jump Squats', 'High Knees', 'Battle Ropes'],
            },
        ]);
        await activity_1.default.create([
            { user: users[1]._id, type: 'Running', durationMinutes: 45, caloriesBurned: 420, timestamp: new Date('2026-07-20T07:30:00Z') },
            { user: users[2]._id, type: 'Cycling', durationMinutes: 55, caloriesBurned: 510, timestamp: new Date('2026-07-21T09:00:00Z') },
            { user: users[3]._id, type: 'Strength Training', durationMinutes: 40, caloriesBurned: 360, timestamp: new Date('2026-07-22T18:00:00Z') },
            { user: users[0]._id, type: 'Yoga', durationMinutes: 30, caloriesBurned: 150, timestamp: new Date('2026-07-23T06:30:00Z') },
        ]);
        await leaderboard_1.default.create([
            { user: users[1]._id, score: 1420, rank: 1, category: 'weekly' },
            { user: users[2]._id, score: 1280, rank: 2, category: 'weekly' },
            { user: users[3]._id, score: 1150, rank: 3, category: 'weekly' },
            { user: users[0]._id, score: 980, rank: 1, category: 'coaches' },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
