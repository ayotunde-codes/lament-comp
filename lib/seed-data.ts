import { Industry } from '@/types'
import type { Organization, Review } from '@/types'

export const SEED_ORGS: Organization[] = [
  { id: 'gtco', name: 'Guaranty Trust', logo: 'GT', industry: Industry.Banking, averageRating: 3.75, reviewCount: 4 },
  { id: 'access', name: 'Access Bank', logo: 'AC', industry: Industry.Banking, averageRating: 3.0, reviewCount: 3 },
  { id: 'flutterwave', name: 'Flutterwave', logo: 'FW', industry: Industry.Fintech, averageRating: 4.0, reviewCount: 3 },
  { id: 'paystack', name: 'Paystack', logo: 'PS', industry: Industry.Fintech, averageRating: 4.33, reviewCount: 3 },
  { id: 'mtn', name: 'MTN Nigeria', logo: 'MT', industry: Industry.Telecom, averageRating: 2.5, reviewCount: 2 },
  { id: 'andela', name: 'Andela', logo: 'AN', industry: Industry.Tech, averageRating: 4.5, reviewCount: 2 },
  { id: 'interswitch', name: 'Interswitch', logo: 'IS', industry: Industry.Fintech, averageRating: 4.0, reviewCount: 1 },
  { id: 'zenith', name: 'Zenith Bank', logo: 'ZB', industry: Industry.Banking, averageRating: 3.0, reviewCount: 1 },
  { id: 'cowrywise', name: 'Cowrywise', logo: 'CW', industry: Industry.Fintech, averageRating: 4.0, reviewCount: 1 },
  { id: 'airtel', name: 'Airtel Nigeria', logo: 'AI', industry: Industry.Telecom, averageRating: 3.0, reviewCount: 1 },
  { id: 'semicolon', name: 'Semicolon Africa', logo: 'SA', industry: Industry.Education, averageRating: 4.0, reviewCount: 1 },
  { id: 'carbon', name: 'Carbon', logo: 'CB', industry: Industry.Fintech, averageRating: 4.0, reviewCount: 1 },
]

export const SEED_REVIEWS: Review[] = [
  { id: 'r1', orgId: 'gtco', username: 'MysticOwl', avatar: '#7C3AED', rating: 4,
    heading: 'Good benefits, slow promotions', body: 'Pay is competitive for banking but promotions take forever. Management is mostly fair and the work environment is decent.', timestamp: '2026-04-15T08:00:00Z', likes: 15, dislikes: 2 },
  { id: 'r2', orgId: 'gtco', username: 'SilentWolf', avatar: '#10B981', rating: 3,
    heading: 'Work-life balance needs improvement', body: 'Constant weekend calls and after-hours pings. The culture rewards presence over output which gets exhausting.', emoji: '😤', timestamp: '2026-03-28T14:00:00Z', likes: 22, dislikes: 1 },
  { id: 'r3', orgId: 'gtco', username: 'CalmTiger', avatar: '#F59E0B', rating: 5,
    heading: 'Best bank to work at in Lagos', body: 'The culture is actually good compared to other banks. Senior management is accessible and feedback is taken seriously.', emoji: '🚀', timestamp: '2026-03-10T09:00:00Z', likes: 31, dislikes: 4 },
  { id: 'r4', orgId: 'gtco', username: 'NobleFox', avatar: '#EF4444', rating: 3,
    heading: 'Mid-level management is the problem', body: 'Great company on paper but the layer of middle managers creates unnecessary friction. Things get better as you go up.', timestamp: '2026-02-20T11:00:00Z', likes: 18, dislikes: 3 },

  { id: 'r5', orgId: 'access', username: 'SwiftEagle', avatar: '#3B82F6', rating: 3,
    heading: 'Decent pay, high pressure', body: 'Targets are aggressive and the pressure never lets up, but the pay is decent and the brand carries weight on your CV.', emoji: '😅', timestamp: '2026-04-10T10:00:00Z', likes: 9, dislikes: 1 },
  { id: 'r6', orgId: 'access', username: 'WildPuma', avatar: '#EC4899', rating: 4,
    heading: 'Good growth if you perform', body: 'If you hit your numbers you get promoted quickly. Clear meritocracy — not all banks can say that.', timestamp: '2026-02-14T15:00:00Z', likes: 14, dislikes: 0 },
  { id: 'r7', orgId: 'access', username: 'GentleBear', avatar: '#7C3AED', rating: 2,
    heading: 'Very toxic in some branches', body: 'Branch-level culture varies wildly. My branch head made every day miserable. HR exists to protect the bank, not you.', emoji: '😡', timestamp: '2026-01-25T08:00:00Z', likes: 27, dislikes: 5 },

  { id: 'r8', orgId: 'flutterwave', username: 'BoldLynx', avatar: '#10B981', rating: 4,
    heading: 'Great engineering culture', body: 'Strong engineering practices, decent tech stack, and your work actually ships. Occasional chaos but that is startup life.', timestamp: '2026-04-08T13:00:00Z', likes: 20, dislikes: 2 },
  { id: 'r9', orgId: 'flutterwave', username: 'QuietDeer', avatar: '#F59E0B', rating: 5,
    heading: 'Top-tier pay for Nigeria', body: 'Dollar-pegged salary changes everything. If you can get in and survive the interviews, the compensation is unmatched locally.', emoji: '💰', timestamp: '2026-03-05T09:00:00Z', likes: 44, dislikes: 3 },
  { id: 'r10', orgId: 'flutterwave', username: 'BraveHawk', avatar: '#EF4444', rating: 3,
    heading: 'Work-life balance is a myth here', body: 'Expectation is 24/7 availability. Great for your career short term but unsustainable. Take care of yourself.', emoji: '😩', timestamp: '2026-01-18T16:00:00Z', likes: 33, dislikes: 6 },

  { id: 'r11', orgId: 'paystack', username: 'DarkRaven', avatar: '#3B82F6', rating: 5,
    heading: 'The gold standard of Nigerian tech', body: 'Culture, pay, growth, and impact are all 10/10. Competition to get in is fierce but worth every prep hour.', emoji: '🌟', timestamp: '2026-04-05T10:00:00Z', likes: 52, dislikes: 2 },
  { id: 'r12', orgId: 'paystack', username: 'FierceLion', avatar: '#EC4899', rating: 4,
    heading: 'Amazing benefits and real ownership', body: 'Equity that might actually matter, full health cover, and you genuinely own your projects. Rare in this market.', timestamp: '2026-02-28T11:00:00Z', likes: 38, dislikes: 1 },
  { id: 'r13', orgId: 'paystack', username: 'WiseOtter', avatar: '#7C3AED', rating: 4,
    heading: 'High bar, high reward', body: 'The hiring bar is very high and performance expectations match it. Not for everyone, but if you thrive under pressure it is excellent.', timestamp: '2026-01-30T14:00:00Z', likes: 29, dislikes: 3 },

  { id: 'r14', orgId: 'mtn', username: 'CuriousPanda', avatar: '#10B981', rating: 3,
    heading: 'Classic large-corporation problems', body: 'Bureaucracy slows everything down. Getting anything approved takes weeks. Job security is good but innovation is almost impossible.', emoji: '🐢', timestamp: '2026-03-20T09:00:00Z', likes: 16, dislikes: 2 },
  { id: 'r15', orgId: 'mtn', username: 'StealthCat', avatar: '#F59E0B', rating: 2,
    heading: 'Toxic management in some divisions', body: 'Your experience depends entirely on who your direct manager is. Mine was a nightmare. Lateral transfers are nearly impossible.', emoji: '😭', timestamp: '2026-01-10T08:00:00Z', likes: 21, dislikes: 4 },

  { id: 'r16', orgId: 'andela', username: 'LuckyMoose', avatar: '#EF4444', rating: 4,
    heading: 'World-class exposure for African devs', body: 'Working with global clients accelerates your growth faster than almost any local option. Remote and flexible too.', timestamp: '2026-04-01T12:00:00Z', likes: 35, dislikes: 1 },
  { id: 'r17', orgId: 'andela', username: 'ProudElk', avatar: '#3B82F6', rating: 5,
    heading: 'Changed my career trajectory', body: 'Got in as a mid-level dev and am now working with a San Francisco team. The upskilling and network is genuinely life-changing.', timestamp: '2026-02-10T10:00:00Z', likes: 47, dislikes: 2 },

  { id: 'r18', orgId: 'interswitch', username: 'ShadyFox', avatar: '#EC4899', rating: 4,
    heading: 'Stable and underrated', body: 'Not as flashy as the newer fintechs but rock solid. Good salary, reasonable hours, and the product actually works at scale.', timestamp: '2026-03-15T13:00:00Z', likes: 12, dislikes: 1 },

  { id: 'r19', orgId: 'zenith', username: 'ZenCrane', avatar: '#7C3AED', rating: 3,
    heading: 'Typical bank, nothing special', body: 'If you want banking experience and brand name on your CV it works. Do not expect innovation or modern management practices.', timestamp: '2026-02-05T09:00:00Z', likes: 8, dislikes: 2 },

  { id: 'r20', orgId: 'cowrywise', username: 'CoolWalrus', avatar: '#10B981', rating: 4,
    heading: 'Great startup energy, good mission', body: 'Small team, real ownership, and you can see your work in the product the same week. Pay is growing with the company.', timestamp: '2026-01-05T11:00:00Z', likes: 19, dislikes: 0 },

  { id: 'r21', orgId: 'airtel', username: 'MysticOwl', avatar: '#7C3AED', rating: 3,
    heading: 'Mixed bag depending on your role', body: 'Technical roles are okay but sales-facing positions have brutal targets. Benefits are competitive with the sector.', timestamp: '2025-12-20T10:00:00Z', likes: 7, dislikes: 1 },

  { id: 'r22', orgId: 'semicolon', username: 'SilentWolf', avatar: '#10B981', rating: 4,
    heading: 'Life-changing program for staff too', body: 'Working here as staff gives you genuine purpose. You see the transformation in the residents. Pay is modest but the mission makes it worth it.', timestamp: '2025-12-10T09:00:00Z', likes: 23, dislikes: 0 },

  { id: 'r23', orgId: 'carbon', username: 'CalmTiger', avatar: '#F59E0B', rating: 4,
    heading: 'Lean team, fast-moving product', body: 'Smaller than the big fintechs but you wear more hats and grow faster. Leadership listens and acts on feedback.', timestamp: '2025-12-15T14:00:00Z', likes: 11, dislikes: 1 },
]
