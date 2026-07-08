# Daily update playbook — Korea digital finance alliance map

Project: `/Users/lt-145/Claude/Projects/korea-alliance-map/`
Live artifact: https://claude.ai/code/artifact/96ca6662-6fa0-4764-8fd7-3351a12df857 (favicon 🇰🇷 — always redeploy to this URL, never mint a new one)

## Goal
Keep the alliance map and the "This week's news" tab current with news about Korean financial institutions and tech companies forming digital-asset alliances (stablecoins, custody, tokenization/STO, acquisitions/stakes). Runs daily at 10:00.

## Steps
1. Web-search for news from the past 1-2 days (overlap is fine; dedupe against existing data). Search in BOTH English and Korean — Korean-language outlets carry many deals English media misses. Suggested queries (vary as needed):
   - "원화 스테이블코인 제휴 컨소시엄 은행", "디지털자산 커스터디 업무협약 MOU", "토큰증권 STO 제휴", "가상자산 거래소 지분 인수"
   - "Korea won stablecoin consortium alliance bank", "Korea digital asset custody partnership MOU", "Korea tokenized securities STO partnership"
   - Korean outlets worth checking by site: sedaily.com, ajunews.com, etoday.co.kr, zdnet.co.kr, blockmedia.co.kr, digitaltoday.co.kr, coindeskkorea.com, newspim.com, hankyung.com
   - Company-specific follow-ups on open threads: Kakao consortium talks, KB-Toss, Bithumb-Toss JV, Naver-Dunamu FTC review, Coinone co-acquisition, Canton Network Korea, KT-KBank-BC Card stablecoin, Lambda256 off-ramp PoC, AhnLab K-STAR, Shinhan Super SOL wallet, DSRV.
2. Extract only alliance facts: who partnered with whom, what they are building, deal size/date, whether signed or in talks.
3. Edit `data.json` ONLY (never edit template.html unless fixing a bug):
   - Add/update `nodes` (id: short-lowercase, cat: bank|tech|pb|cn|sec|gl|hub; `pb` = platform owning a licensed bank, e.g. Kakao, Toss). The site is bilingual: every node needs `label` + `labelKo` and `desc` + `descKo` (Korean translation, natural business-news register).
   - Add/update `edges` (type: sc=stablecoin/payments, cu=custody, to=tokenization/STO, ma=acquisition/stake; solid: false = talks/pending). Every edge needs `desc` + `descKo`. If talks become signed deals, flip `solid` to true and update both descriptions.
   - Avoid apostrophes in desc strings where possible; plain ASCII preferred.
   - Maintain the `news` array (powers the "This week's news" tab): prepend new partnership articles as {date: "YYYY-MM-DD" (publication date), title: original Korean headline (or English if the outlet is English), titleEn: English translation, url}. Keep only items from the last 7 days, newest first. Every alliance-relevant article found goes here even if it does not change the graph.
   - Set `lastUpdated` to today (YYYY-MM-DD).
   - Prepend a `changelog` entry with both `note` (English) and `noteKo` (Korean) summarizing what changed (1-2 sentences) — but ONLY on days when the graph or news list actually changed; on no-news days just update `lastUpdated` and skip the changelog entry to avoid clutter.
   - Append any new `sources` (title + url); keep list under ~25 by pruning superseded ones.
4. Build: `/usr/local/bin/node /Users/lt-145/Claude/Projects/korea-alliance-map/build.js` — must print the node/edge count without error.
5. Redeploy with the Artifact tool: file `/Users/lt-145/Claude/Projects/korea-alliance-map/index.html`, favicon 🇰🇷, url https://claude.ai/code/artifact/96ca6662-6fa0-4764-8fd7-3351a12df857, label like "week-of-YYYY-MM-DD".
6. Publish to the public site (GitHub Pages at https://mikeyjunghwanlee.github.io/korea-alliance-map/): run `git -C /Users/lt-145/Claude/Projects/korea-alliance-map add -A`, then `git -C /Users/lt-145/Claude/Projects/korea-alliance-map commit -m "Daily update YYYY-MM-DD"`, then `git -C /Users/lt-145/Claude/Projects/korea-alliance-map push` (use the `git -C` form exactly — it is pre-approved for headless runs; `cd ... && git ...` chains will stall on a permission prompt). Pages rebuilds automatically on push.

## Guardrails
- Public news only; never add non-public DSRV/deal information.
- Keep the graph readable: fold minor subsidiaries into their parent group node; only add a new node if it appears in 1+ alliance edge.
- Preserve existing node ids (the layout seeds and edges depend on them).
