import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative bg-page min-h-screen flex items-center pt-14">
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      <div className="container-wide w-full py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Left */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-full px-3 py-1.5 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs text-brand-red">Africa's blockchain developer school · Est. 2019</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight mb-4">
              Africa's engineers
              <br />are building the{' '}
              <span className="text-brand-red">next internet.</span>
            </h1>
            <p className="text-sm sm:text-base text-ink/50 leading-relaxed mb-7 max-w-md">
              Web3Bridge trains world-class blockchain developers through Africa's most rigorous hands-on bootcamp. 16 weeks. Real projects. Global careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link href="/apply" className="btn-primary text-center">Apply for next cohort</Link>
              <Link href="/about" className="btn-ghost text-center flex items-center justify-center gap-2">
                <span className="text-xs">▶</span> Watch our story
              </Link>
            </div>
            <div className="flex gap-0 bg-ink/[0.03] border border-ink/5 rounded-xl overflow-hidden w-fit">
              {[['3,000+','Developers'],['5th','Conference'],['20+','Countries']].map((s,i)=>(
                <div key={i} className={`px-4 py-3 ${i<2?'border-r border-ink/5':''}`}>
                  <div className="text-lg sm:text-xl font-bold text-ink leading-none mb-1">
                    {s[0].replace('+','').replace('th','')}<span className="text-brand-red">{s[0].includes('+')?'+':(s[0].includes('th')?'th':'')}</span>
                  </div>
                  <div className="text-[10px] text-ink/30">{s[1]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo mosaic — hidden on mobile, shown on lg+ */}
          <div className="hidden lg:grid grid-cols-4 grid-rows-3 gap-1 h-[480px]">
            {[
              {cls:'col-span-1 row-span-2',label:'Cohort session'},
              {cls:'',label:'Live coding'},
              {cls:'',label:'Graduate'},
              {cls:'col-span-1 row-span-2',label:'Conference talk'},
              {cls:'',label:'Student'},
              {cls:'',label:'Graduation'},
              {cls:'col-span-2',label:'Web3 Lagos Conference crowd'},
              {cls:'',label:'Alumni'},
              {cls:'',label:'Builder'},
            ].map((cell,i)=>(
              <div key={i} className={`${cell.cls} bg-ink/5 rounded-lg overflow-hidden border border-ink/5 flex items-center justify-center flex-col gap-2`}>
                <span className="text-[9px] text-ink/20 text-center px-2">{cell.label}</span>
              </div>
            ))}
          </div>

          {/* Mobile — show 2x2 photo grid instead of full mosaic */}
          <div className="grid grid-cols-2 gap-2 h-48 lg:hidden">
            {['Cohort session','Conference talk','Live coding','Graduation'].map((l,i)=>(
              <div key={i} className="bg-ink/5 rounded-lg border border-ink/5 flex items-center justify-center">
                <span className="text-[9px] text-ink/20">{l}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
