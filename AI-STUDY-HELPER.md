# AI Study Helper

Separate from community chat. POST /api/study-helper sends the question and up to four recent messages to Cloudflare Workers AI. Conversation history stays in page memory and is not written to Durable Objects, traffic records or browser storage. Refresh or Clear chat removes it from the page. Do not enable AI Gateway request logging without reviewing that privacy claim.

Runtime binding: AI. Quota binding: STUDY_QUOTA, exported StudyHelperQuota, migration v3-study-helper-quota. Model: @cf/google/gemma-4-26b-a4b-it with thinking disabled, max_completion_tokens 700, and no automatic retry or fallback to a paid-only model.

Initial limits: 50 model attempts for this feature per UTC day, 8 attempts per visitor IP per UTC day, 10-second cooldown, and two simultaneous calls. Resets at 05:30 India time. Failed attempts count toward the allowance to bound retry costs. The quota stores daily IP hashes, counts, timestamps and short-lived leases; it never stores prompts or answers. Aggregate model input is capped at 8,000 UTF-8 bytes and request bodies at 20,000 bytes. Global reservations are atomic and remain after deployment/restart.

Cloudflare Workers AI has an account-wide free allocation. Other Workers can consume it; limits for this feature are not a guarantee that the whole account has zero charges. No paid plan upgrade is performed by this change. Disable immediately by setting runtime variable STUDY_AI_DISABLED to true; remove it or set false to re-enable.

The helper offers study explanations and practice, not retrieval from the hub's PDFs. It must not invent quotations, syllabus access, links or citations. English and Malayalam quality should be monitored. The visible UI asks students to verify answers against class notes and avoid personal information.
