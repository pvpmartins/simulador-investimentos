import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Resultados from './components/Resultados/Resultados'
import { getFakeApi } from './service/Api'

export interface IValores {
    tipoIndexacao: String,
		tipoRendimento: String,
		valorFinalBruto: Number,
		aliquotaIR: Number,
		valorPagoIR: Number,
		valorTotalInvestido: Number,
		valorFinalLiquido: Number,
		ganhoLiquido: Number,
		graficoValores: {
			comAporte: {
				0: Number,
				1: Number,
				2: Number,
				3: Number,
				4: Number,
				5: Number,
				6: Number,
				7: Number,
				8: Number,
				9: Number,
				10: Number
			}
  }
}

function App() {
  // States para exibição de erros de digitação nos inputs
  const [aporteError, setAporteError] = useState<String>()
  const [prazoError, setPrazoError] = useState<String>()
  const [ipcaError, setIpcaError] = useState<String>()
  const [aporteMensalError, setAporteMensalError] = useState<String>()
  const [rentabilidadeError, setRentabilidadeError] = useState<String>()
  const [cdiError, setCdiError] = useState<String>()

  // Funções para validação de inputs
  const aporteValidation = (input: HTMLInputElement) => {
    if (isNaN(input.value)){
      setAporteError("Aporte com apenas números")
    } else{
      setAporteError("")
    }
  }
  const aporteMensalValidation = (input: HTMLInputElement) => {
    if(isNaN(input.value)){
      setAporteMensalError("Aporte com apenas números")
    }else{
      setAporteMensalError("")
    }
  }

  const prazoValidation = (input: HTMLInputElement) => {
    if(isNaN(input.value)){
      setPrazoError("Prazo com apenas números")
    }else{
      setPrazoError("")
    }
  }

  const rentabilidadeValidation = (input: HTMLInputElement) => {
    if(isNaN(input.value)){
      setRentabilidadeError("Renta. com apenas números")
    }else{
      setRentabilidadeError("")
    }
  }

  const cdiValidation = (input: HTMLInputElement) => {
    if(isNaN(input.value)){
      setCdiError("CDI com apenas números")
    }else{
      setCdiError("")
    }
  }

  const ipcaValidation = (input: HTMLInputElement) => {
    if(isNaN(input.value)){
      setIpcaError("IPCA com apenas números")
    }else{
      setIpcaError("")
    }
  }

  const limparCampos = () => {
    const campos = document.querySelectorAll<HTMLInputElement>(".input input")
    campos.forEach(campo=>{
      campo.value = ""
    })

  setAporteError("")
  setPrazoError("")
  setIpcaError("")
  setAporteMensalError("")
  setRentabilidadeError("")
  setCdiError("")
    
  }
  ///////////////////////////////////////////////////////////////
  
  //Array com todos os
  const [simulacao, setSimulacao] = useState<IValores>()

  const [tipoRend, setTipoRend] = useState<String>("bruto")
  const [tipoIndex, setTipoIndex] = useState<String>("pre")


  const fetchSimulacao = async() => {
    const data = await getFakeApi()
    // console.log(data)
    setSimulacao(filterSimulacoes(data, tipoIndex, tipoRend))
  }
  useEffect(()=>{
    console.log(simulacao)
  },[simulacao])

  
  // Função para retorno do objeto selecionado de acordo com os inputs
  const filterSimulacoes = (simulacoes:Array<IValores>,tipoIndex:String, tipoRend:String) => {
    const simulacao = simulacoes?.filter(obj=>obj.tipoIndexacao === tipoIndex && obj.tipoRendimento === tipoRend)
    return simulacao[0]
  }


  return (
    <div className="App">
      <h1>
        Simulador de Investimentos
      </h1>
        <div className="simulador">
          <div className="form">
            <p>Simulador</p>
            <div className="form__input">
              <div className="col-1">
                <div className="radio">
                  <input className='radio__input' defaultChecked={true} type="radio" value='option1' name='radio' id='bruto' />
                  <label className='radio__label' onClick={e=>setTipoRend("bruto")} htmlFor="bruto">Bruto</label>
                  <input className='radio__input' type="radio" value='option2' name='radio' id='liquido' />
                  <label className='radio__label' onClick={e=>setTipoRend("liquido")} htmlFor="liquido">Líquido</label>
                </div>
                <div className="input aporte-inicial">
                  <label htmlFor="aporte-inicial">Aporte Inicial</label>
                  <input onChange={(e)=>aporteValidation(e.target)} type="text" id='aporte-inicial' />
                  <p>{aporteError}</p>
                </div>
                <div className="input prazo-meses">
                  <label htmlFor="prazo-meses">Prazo (em meses)</label>
                  <input onChange={e => prazoValidation(e.target)} type="text" id='prazo-meses'/>
                  <p>{prazoError}</p>
                </div>
                <div className="input ipca">
                  <label htmlFor="ipca-anual">IPCA (ao ano)</label>
                  <span className='valuePadding'><input onChange={(e)=>ipcaValidation(e.target)} type="text" id='ipca-anual'/>%</span>
                  <p>{ipcaError}</p>
                </div>
              </div>
              <div className="col-2">
              <div className="radio">
                  <input className='radio__input' defaultChecked={true} type="radio" value='option1' name='radio2' id='pre' />
                  <label onClick={()=>setTipoIndex("pre")} className='radio__label' htmlFor="pre">Pré</label>
                  <input className='radio__input' type="radio" value='option2' name='radio2' id='pos' />
                  <label onClick={()=>setTipoIndex("pos")} className='radio__label' htmlFor="pos">Pós</label>
                  <input className='radio__input' type="radio" value='option2' name='radio2' id='ipca' />
                  <label onClick={()=>setTipoIndex("ipca")} className='radio__label' htmlFor="ipca">Fixado</label>
                </div>
              <div className="input aporte-mensal">
                <label htmlFor="aporte-mensal">Aporte Mensal</label>
                <input onChange={(e)=>aporteMensalValidation(e.target)} type="text" defaultValue={"R$"} id='aporte-mensal' />
                <p>{aporteMensalError}</p>
              </div>
              <div className="input rentabilidade">  
                <label htmlFor="rentabilidade">Rentabilidade</label>
                <input onChange={(e)=>rentabilidadeValidation(e.target)} type="text" id='rentabilidade'/>
                <p>{rentabilidadeError}</p>
              </div>
              <div className="input cdi-anual">
                <label htmlFor="cdi-anual">CDI (ao ano)</label>
                <span className='valuePadding'><input onChange={(e)=>cdiValidation(e.target)} type="text" id='cdi-anual'/>%</span>
                <p>{cdiError}</p>
              </div>
              
            </div>
          </div>
          <div className="button">
            <div onClick={()=>limparCampos()} className="limpar">Limpar Campos</div>
            <div onClick={()=>fetchSimulacao()} className="simular">Simular</div>
          </div>
          </div>
          <Resultados resultados={simulacao}/>
        </div>
    </div>
  )
}

export default App
