ALTER TABLE "projects"
  ADD COLUMN IF NOT EXISTS "localizedContent" JSONB,
  ADD COLUMN IF NOT EXISTS "captions" JSONB;

UPDATE "projects"
SET "localizedContent" = jsonb_build_object(
  'pt', jsonb_build_object(
    'title', "title", 'description', "description", 'problemTitle', "problemTitle",
    'problemDescription', "problemDescription", 'solutionTitle', "solutionTitle",
    'solutionDescription', "solutionDescription", 'resultTitle', "resultTitle",
    'resultDescription', "resultDescription"
  ),
  'en', jsonb_build_object(
    'title', "title", 'description', "description", 'problemTitle', "problemTitle",
    'problemDescription', "problemDescription", 'solutionTitle', "solutionTitle",
    'solutionDescription', "solutionDescription", 'resultTitle', "resultTitle",
    'resultDescription', "resultDescription"
  )
)
WHERE "localizedContent" IS NULL;

UPDATE "config"
SET "siteName" = 'Vagner Silva',
    "aboutBio" = '{"pt":["Sou Vagner Silva, desenvolvedor Full Stack com foco em produtos web, interfaces claras, APIs confiáveis e IA aplicada.","Trabalho com Next.js, TypeScript, NestJS e PostgreSQL para transformar jornadas complexas em experiências objetivas e fáceis de evoluir."],"en":["I am Vagner Silva, a Full Stack Developer focused on web products, clear interfaces, reliable APIs and applied AI.","I work with Next.js, TypeScript, NestJS and PostgreSQL to turn complex journeys into objective, evolvable experiences."]}'::jsonb
WHERE "siteName" = 'João Silva';

INSERT INTO "projects" ("id", "title", "description", "techStack", "localizedContent", "featured", "createdAt", "updatedAt")
SELECT 'store-ritual-case', 'Loja Ritual', 'E-commerce full stack para uma jornada de compra clara, do catálogo à operação.', ARRAY['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Mercado Pago', 'Cloudinary'],
'{"pt":{"title":"Loja Ritual","description":"E-commerce full stack de produtos físicos, criado para tornar a compra simples para o cliente e a operação visível para quem administra a loja.","problemTitle":"Problema","problemDescription":"Uma loja precisa oferecer descoberta, compra e acompanhamento de pedidos sem depender de fluxos desconectados.","solutionTitle":"Solução","solutionDescription":"Catálogo pesquisável, carrinho, checkout como visitante, frete por região, pagamento simulado e painel administrativo integrados em uma mesma jornada.","resultTitle":"Entrega","resultDescription":"Uma base demonstrável de e-commerce com experiência pública e operações de produto, pedidos e estoque."},"en":{"title":"Ritual Store","description":"A full-stack physical-products e-commerce experience designed to keep buying simple and store operations visible.","problemTitle":"Problem","problemDescription":"A store needs product discovery, checkout and order follow-up without disconnected customer and admin flows.","solutionTitle":"Solution","solutionDescription":"Searchable catalog, cart, guest checkout, region-based shipping, simulated payment and an admin panel in one journey.","resultTitle":"Delivery","resultDescription":"A demonstrable e-commerce foundation covering the public journey plus product, order and inventory operations."}}'::jsonb, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "projects" WHERE "id" = 'store-ritual-case');

INSERT INTO "projects" ("id", "title", "description", "techStack", "localizedContent", "featured", "createdAt", "updatedAt")
SELECT 'catalog-semantic-case', 'Catálogo Inteligente com Busca Semântica', 'Catálogo de produtos com descoberta semântica e arquitetura preparada para RAG.', ARRAY['Next.js', 'NestJS', 'PostgreSQL', 'pgvector', 'LangChain', 'Groq'],
'{"pt":{"title":"Catálogo Inteligente com Busca Semântica","description":"Catálogo de produtos que transforma intenção em descoberta, combinando busca semântica, dados estruturados e uma base preparada para respostas assistidas.","problemTitle":"Problema","problemDescription":"Busca textual simples não acompanha a intenção de quem procura produtos nem explica como o catálogo pode evoluir.","solutionTitle":"Solução","solutionDescription":"Frontend em Next.js, API NestJS, worker de ingestão e PostgreSQL com pgvector para preparar, indexar e recuperar contexto semântico.","resultTitle":"Entrega","resultDescription":"Um MVP técnico documentado, com busca, administração e pipeline de indexação pronto para evoluir com RAG."},"en":{"title":"AI-Powered Product Catalog","description":"A product catalog that turns intent into discovery by combining semantic search, structured data and a foundation for assisted answers.","problemTitle":"Problem","problemDescription":"Keyword search does not capture product intent or explain how a catalog can evolve.","solutionTitle":"Solution","solutionDescription":"A Next.js frontend, NestJS API, ingestion worker and PostgreSQL with pgvector to prepare, index and retrieve semantic context.","resultTitle":"Delivery","resultDescription":"A documented technical MVP with search, administration and an indexing pipeline ready to evolve with RAG."}}'::jsonb, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "projects" WHERE "id" = 'catalog-semantic-case');
