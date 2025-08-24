import { TEAM_MEMBERS } from '../constants';
import { TeamMember } from '../types';

/**
 * Get team member by username
 * In the future, this will fetch from a database API
 */
export const getTeamMemberByUsername = async (username: string): Promise<TeamMember | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return TEAM_MEMBERS.find(member => member.username === username) || null;
};

/**
 * Get all team members
 * In the future, this will fetch from a database API
 */
export const getAllTeamMembers = async (): Promise<TeamMember[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return TEAM_MEMBERS;
};

/**
 * Get team member suggestions (for future use)
 */
export const getTeamMemberSuggestions = async (currentUsername: string): Promise<TeamMember[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return TEAM_MEMBERS.filter(member => member.username !== currentUsername).slice(0, 3);
};
