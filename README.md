![Preview](https://utfs.io/f/c9e928ba-5116-4119-bece-65c499f65854-1rp1pj.png)

## SOBRE O PROJETO

Financial Control é uma aplicação web desenvolvida para facilitar o gerenciamento e a organização das finanças pessoais.

Com ela, o usuário pode cadastrar todos os bancos onde possui contas e registrar receitas e despesas para cada um, permitindo um controle completo do dinheiro que entra e sai de todas as suas contas.

Para unificar o desenvolvimento do backend e do frontend, optei por utilizar o Next.js, que facilita a integração entre funcionalidades do lado do servidor e do cliente. Isso simplifica tanto o desenvolvimento quanto a manutenção do código, caso necessário.

Criei um sistema que calcula todas as despesas para fornecer um controle mais completo ao usuário, permitindo que ele veja suas despesas em um período de tempo específico. Fiz o mesmo para as receitas, oferecendo um controle sobre quanto entrou e saiu em determinado período. Além disso, o sistema calcula o saldo atual de todas as contas, permitindo ao usuário saber o valor total que possui, considerando todas as contas juntas.

A aplicação possui um sistema de login com o Google, garantindo que cada dado cadastrado seja associado a um usuário específico e acessível apenas por ele.

A aplicação está intuitiva e responsiva. Espero que você possa acessá-la e explorar todas as funcionalidades que preparei. Se decidir testar, por favor, me envie um feedback. Estou me aprofundando cada vez mais no universo da tecnologia e programação, e toda opinião, sugestão ou feedback é muito bem-vindo.

## TECNOLOGIAS USADAS

A estrutura geral do projeto foi desenvolvida utilizando Next.js em conjunto com TypeScript, o que garantiu uma base sólida e tipada. Cada vez mais, tenho apreciado o uso do Next.js em minhas aplicações, principalmente pela sua capacidade de unificar o desenvolvimento backend e frontend em um só ambiente.

O uso do TypeScript, por sua vez, trouxe uma camada extra de segurança ao código, ao evitar erros comuns em tempo de execução e melhorar a legibilidade, graças à tipagem estática.

Toda a estilização do projeto foi feita utilizando TailwindCSS, uma biblioteca com a qual tenho bastante familiaridade. Ela facilita o desenvolvimento ao reduzir significativamente a necessidade de escrever CSS personalizado, permitindo que o foco seja mantido na implementação da interface e nas funcionalidades.

Para implementar o sistema de login na aplicação, utilizei a biblioteca NextAuth. Ela permitiu que as interações na aplicação fossem restritas a usuários autenticados, garantindo uma camada adicional de segurança e controle de acesso.

Para o armazenamento dos dados dos usuários e das informações cadastradas por eles, utilizei o Supabase como banco de dados e, para facilitar o gerenciamento e a manipulação desses dados, optei pelo Prisma. Com o Prisma, criei um schema que define a estrutura dos dados de forma clara e eficiente, proporcionando uma interface robusta para interagir com o banco de dados.

Além das tecnologias mencionadas, utilizei algumas bibliotecas que contribuíram para agilizar o desenvolvimento. O React Hook Form, por exemplo, foi fundamental para a validação dos formulários de maneira simples e eficiente. Para tornar a interface mais atraente, utilizei o Lucide Icons, adicionando ícones em diversas partes da aplicação.
