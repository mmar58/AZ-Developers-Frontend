# Team Profile Pages

## Overview
Dynamic profile pages for team members accessible via `/profile/[username]` routes. Designed to be database-ready for future expansion.

## Features
- **Dynamic Routing**: Each team member has a unique URL based on their username
- **Contact Integration**: Contact modal and toast notifications work on profile pages
- **Responsive Design**: Mobile-friendly layout with sticky profile card
- **Social Links**: LinkedIn, GitHub, Twitter integration
- **API Ready**: Abstracted data layer for easy database integration

## URL Structure
```
/profile/alex-johnson    → Alex Johnson's profile
/profile/brenda-smith    → Brenda Smith's profile
/profile/carlos-rivera   → Carlos Rivera's profile
/profile/diana-chen      → Diana Chen's profile
```

## Components

### ProfilePage (`/profile/[username]/page.tsx`)
- Main profile page component
- Handles dynamic username parameter
- Shows loading state while fetching data
- 404 handling for non-existent profiles

### TeamMemberCard (Updated)
- Now links to profile pages instead of showing inline details
- Removed modal functionality
- Added "View Profile →" call-to-action

### API Layer (`/lib/teamApi.ts`)
- `getTeamMemberByUsername()` - Fetch single member by username
- `getAllTeamMembers()` - Get all team members
- `getTeamMemberSuggestions()` - Future use for related profiles

## Database Integration (Future)

When connecting to a database, update these files:

1. **API Functions** (`/lib/teamApi.ts`):
   ```typescript
   export const getTeamMemberByUsername = async (username: string) => {
     const response = await fetch(`/api/team/${username}`);
     return response.json();
   };
   ```

2. **API Routes** (`/api/team/[username]/route.ts`):
   ```typescript
   export async function GET(request: Request, { params }: { params: { username: string } }) {
     const member = await db.teamMember.findUnique({
       where: { username: params.username }
     });
     return Response.json(member);
   }
   ```

3. **Static Generation** (Uncomment in profile page):
   ```typescript
   export async function generateStaticParams() {
     const members = await getAllTeamMembers();
     return members.map((member) => ({
       username: member.username,
     }));
   }
   ```

## Data Structure

Each team member requires:
```typescript
interface TeamMember {
  id: number;
  name: string;
  username: string;        // ← Added for URL routing
  role: string;
  imageUrl: string;
  bio: string;
  skills: string[];
  contributions: string[];
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}
```

## Navigation Flow
1. User visits `/team` page
2. Clicks on any team member card
3. Navigates to `/profile/[username]`
4. Sees full profile with contact integration
5. Can use back button or navigate elsewhere

## Testing URLs
- http://localhost:3000/profile/alex-johnson
- http://localhost:3000/profile/brenda-smith  
- http://localhost:3000/profile/carlos-rivera
- http://localhost:3000/profile/diana-chen
- http://localhost:3000/profile/non-existent (404 test)
