import "./Resultados.css"
import { FC } from "react"
import { IValores } from "../../App"


const Resultados = ({resultados}:IValores)=> {
    return (
        <div className="resultados">
            <h1 className="resultados-title">Resultado da simulação</h1>
            <div className="cards">
                <div className="card final-bruto">
                    <h3>Valor Final Bruto</h3>
                    {resultados && `R$ ${resultados.valorFinalBruto}`}
                </div>
                <div className="card aliq-ir">
                    <h3>Valor final Bruto</h3>
                            {resultados && `R$ ${resultados.aliquotaIR}`}
                </div>
                <div className="card valor-ir">
                    <h3>Valor pago em IR</h3>
                    {resultados && `R$ ${resultados.valorPagoIR}`}
                </div>
                <div className="card final-liq"><h3>Valor Final Líquido</h3> {resultados && `R$ ${resultados.valorFinalLiquido}`}</div>
                <div className="card total-inv"><h3>Valor Total Investido</h3> {resultados && `R$ ${resultados.valorTotalInvestido}`}</div>
                <div className="card ganho-liq"><h3>Ganho Líquido</h3>{resultados && `R$ ${resultados.ganhoLiquido}`}</div>
            </div>
        </div>
        
    )
}

export default Resultados