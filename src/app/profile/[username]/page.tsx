import React from 'react';
import { getAllTeamMembers } from '../../lib/teamApi';
import ProfilePageClient from './ProfilePageClient';

// Required for static export with dynamic routes
export async function generateStaticParams() {
  const members = await getAllTeamMembers();
  return members.map((member) => ({
    username: member.username,
  }));
}

// Server component that passes to client component
export default function ProfilePage({ params }: { params: { username: string } }) {
  return <ProfilePageClient username={params.username} />;
}
