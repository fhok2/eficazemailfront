import PlanCard from "./PlanCard";

const free = [
  "Versão BETA gratuita", 
  "cancelar direcionamento",
  "reativar direcionamento",
];

const pain = [
  "100 e-mails direcionais",
  "cancelar direcionamento",
  "reativar direcionamento",
  "suporte prioritário",
  "acesso a novos recursos",
  "atualizar e-mail direcional",
];

const PricingSection = () => {
  return (
    <section
      id="planos"
      className="flex flex-col justify-center items-center gap-10 max-w-screen-lg mx-auto my-20 "
    >
      
      <div className="flex flex-wrap  justify-center gap-10 sm:gap-4 md:gap-7 lg-gap-10 xl-gap-10">
        <article >
          <PlanCard
            title="Grátis"
            seats="Individual"
            price={
              <>
                <span>R$0</span>
                <span className="text-sm">,00/mes</span>
              </>
            }
            buttonText="Testar grátis"
            buttonLink="#testefree"
            features={free}
            textConditions="*Sem cartão de crédito ou cadastro necessário"
          />
        </article>
        {/* <article>
          <PlanCard
            title="Mensal"
            seats="Individual"
            price={
              <>
                <span>R$17</span>
                <span className="text-sm">,90/mes</span>
              </>
            }
            buttonText="Assinar Agora"
            buttonLink="/subscribe"
            features={pain}
            textConditions="*Sem fidelidade, cancele a qualquer momento"
          />
        </article> */}
      </div>
    </section>
  );
};

export default PricingSection;
