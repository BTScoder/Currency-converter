import { useEffect, useRef } from "react"
import { AreaSeries, createChart, ColorType, TickMarkType, type Time } from "lightweight-charts"

type ChartData = {
    time: string,
    value: number
}

type ChartProps = {
    data: ChartData[],
    colors: {
        backgroundColor: string,
        lineColor: string,
        textColor: string,
        areaTopColor: string,
        areaBottomColor: string,
    }
}
function Chart(props: ChartProps) {
    const { data, colors: {
        backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor
    }
    } = props;
    const chartContainerRef = useRef<HTMLDivElement | null>(null);



    useEffect(() => {
        if (!chartContainerRef.current) return;

        const handleResize = () => {

            chart.applyOptions({
                width: chartContainerRef.current?.clientWidth,
            });

        }



        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor
            },
            rightPriceScale: {
                visible: false
            },
            leftPriceScale: {
                visible: true
            },
            width: chartContainerRef.current.clientWidth,
            height: 300

        });
        chart.timeScale().fitContent();

        chart.applyOptions({
            localization: {
                tickMarkFormatter: (time: Time, tickMarkType: TickMarkType, locale: string) => {
                    const date = new Date(time.year, time.month - 1, time.day);

                    return date.toLocaleDateString(locale, {
                        month: "short",
                        day: "numeric",
                    });
                },
            },
        })

        chart.timeScale().applyOptions({
            borderColor: "none",

        })

        chart.priceScale("left").applyOptions({
            borderColor: "none",
        })

        const newSeries = chart.addSeries(AreaSeries, {
            lineColor, topColor: areaTopColor, bottomColor: areaBottomColor
        })
        newSeries.setData(data)

        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
            chart.remove()
        }
    }, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor])

    return (
        <>
            <div ref={chartContainerRef} />
        </>
    )
}

export default Chart

//  {
//                 rightPriceScale: {
//                     visible: false,
//                 },
//                 leftPriceScale: {
//                     visible: true
//                 }
//             },
//             {
//             layout: {
//                 background: { type: ColorType.Solid, color: backgroundColor }, textColor,
//             },
//             width: chartContainerRef.current.clientWidth,
//             height: 300
//         }