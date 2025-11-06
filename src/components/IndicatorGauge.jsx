import { RadialBar, RadialBarChart, PolarAngleAxis } from 'recharts'

const IndicatorGauge = ({ label, value, target, color }) => {
  const percentage = Math.min((value / target) * 100, 120)
  const data = [{ name: label, value: percentage, fill: color }]

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 text-white">
      <RadialBarChart
        width={90}
        height={90}
        cx={45}
        cy={45}
        innerRadius={30}
        outerRadius={40}
        barSize={12}
        startAngle={180}
        endAngle={0}
        data={data}
      >
        <PolarAngleAxis type="number" domain={[0, 120]} tick={false} />
        <RadialBar dataKey="value" cornerRadius={8} />
      </RadialBarChart>
      <div>
        <p className="text-xs uppercase tracking-wide text-white/60">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
        <p className="text-xs text-white/60">Target: {target}</p>
      </div>
    </div>
  )
}

export default IndicatorGauge
