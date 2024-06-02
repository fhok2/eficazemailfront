import PlanCard from "./PlanCard";

const free = [
  "3 e-mails direcionais",
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
      <h2 className="-mb-8 font-semibold text-3xl">PLANOS & PREÇOS</h2>
      <div className="mb-10 text-gray-200 md:text-xl px-5">Assuma o controle digital, sem fidelidade, sem cartão de crédito</div>
      <div className="flex gap-10 flex-wrap  justify-center">
        <article>
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
        <article>
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
        </article>
      </div>
    </section>
  );
};

export default PricingSection;
