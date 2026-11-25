# Style Modas

Loja virtual demonstrativa da Style Modas, desenvolvida com Vite e JavaScript.

## Funcionalidades
- Página inicial responsiva para celular e computador
- Catálogo de produtos de demonstração
- Filtro por categoria e pesquisa
- Sacola com controle de quantidades e subtotal
- Montagem do pedido para envio pelo WhatsApp
- Manifesto PWA e ícone instalável

## Executar
```bash
npm install
npm run dev
``

## Gerar versão de produção
```bash
npm run build
``
Os arquivos prontos serão gerados em `dist/`.

## Configurações obrigatórias antes de entregar
- Trocar os produtos, preços e imagens de demonstração pelos dados reais.
- Configurar o WhatsApp oficial da loja na variável `whatsappNumber` em `src/main.js` (DDI + DDD + número, somente dígitos).
- Definir hospedagem e endereço do site.
- Testar os pedidos, imagens e layout em celulares reais.

## Sobre o APK
Esta primeira versão é um site responsivo instalável como PWA. Para entregar um APK Android, ainda será necessário empacotar a versão web com Capacitor, configurar o projeto Android, assinar o aplicativo e testá-lo. O APK ainda não foi gerado.
