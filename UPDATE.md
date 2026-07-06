# Weekly update playbook — Korea digital finance alliance map

Project: `/Users/lt-145/Claude/Projects/korea-alliance-map/`
Live artifact: https://claude.ai/code/artifact/96ca6662-6fa0-4764-8fd7-3351a12df857 (favicon 🇰🇷 — always redeploy to this URL, never mint a new one)

## Goal
Keep the alliance map current with the past week's news about Korean financial institutions and tech companies forming digital-asset alliances (stablecoins, custody, tokenization/STO, acquisitions/stakes).

## Steps
1. Web-search for news from the past 7 days. Suggested queries (vary as needed):
   - "Korea won stablecoin consortium alliance bank" (past week)
   - "Korea digital asset custody partnership MOU"
   - "Korea tokenized securities STO partnership"
   - "Korean bank crypto exchange stake acquisition"
   - Company-specific follow-ups on open threads: Kakao consortium talks, KB-Toss, Bithumb-Toss JV, Naver-Dunamu FTC review, Coinone co-acquisition, Canton Network Korea, DSRV.
2. Extract only alliance facts: who partnered with whom, what they are building, deal size/date, whether signed or in talks.
3. Edit `data.json` ONLY (never edit template.html unless fixing a bug):
   - Add/update `nodes` (id: short-lowercase, cat: bank|tech|pb|cn|sec|gl|hub; `pb` = platform owning a licensed bank, e.g. Kakao, Toss). The site is bilingual: every node needs `label` + `labelKo` and `desc` + `descKo` (Korean translation, natural business-news register).
   - Add/update `edges` (type: sc=stablecoin/payments, cu=custody, to=tokenization/STO, ma=acquisition/stake; solid: false = talks/pending). Every edge needs `desc` + `descKo`. If talks become signed deals, flip `solid` to true and update both descriptions.
   - Avoid apostrophes in desc strings where possible; plain ASCII preferred.
   - Set `lastUpdated` to today (YYYY-MM-DD).
   - Prepend a `changelog` entry with both `note` (English) and `noteKo` (Korean) summarizing what changed (1-2 sentences). If nothing changed, still update `lastUpdated` and add a changelog entry saying "No new alliances reported this week." / "이번 주 보도된 신규 동맹 없음."
   - Append any new `sources` (title + url); keep list under ~25 by pruning superseded ones.
4. Build: `/usr/local/bin/node /Users/lt-145/Claude/Projects/korea-alliance-map/build.js` — must print the node/edge count without error.
5. Redeploy with the Artifact tool: file `/Users/lt-145/Claude/Projects/korea-alliance-map/index.html`, favicon 🇰🇷, url https://claude.ai/code/artifact/96ca6662-6fa0-4764-8fd7-3351a12df857, label like "week-of-YYYY-MM-DD".
6. Publish to the public site (GitHub Pages at https://mikeyjunghwanlee.github.io/korea-alliance-map/): from the project directory run `git add -A && git commit -m "Weekly update YYYY-MM-DD" && git push` (remote: github.com/mikeyjunghwanlee/korea-alliance-map, branch main). Pages rebuilds automatically on push.

## Guardrails
- Public news only; never add non-public DSRV/deal information.
- Keep the graph readable: fold minor subsidiaries into their parent group node; only add a new node if it appears in 1+ alliance edge.
- Preserve existing node ids (the layout seeds and edges depend on them).
