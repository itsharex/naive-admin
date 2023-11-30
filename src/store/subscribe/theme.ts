import {useThemeStore} from "@/store";
import { getColorPalettes, getRgbOfColor} from "@/utils";

export const subscribeThemeStore = () => {
    // 缓存处理
    const uTheme = useThemeStore();
    if (uTheme.mode === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    addThemeColorToCss(uTheme.color)
    // 监听主题颜色
    uTheme.$subscribe((mutation, state) => {
        // 深色模式处理
        if (state.mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        addThemeColorToCss(state.color);
        // 主题色处理
    })
}

function addThemeColorToCss(color: string) {
    const styleCss = []
    const {r, g, b} = getRgbOfColor(color);
    styleCss.push(`--primary-color: ${r},${g},${b}`);
    const colorPaletteList = getColorPalettes(color);
    colorPaletteList.forEach((color, index) => {
        const {r: R, g: G, b: B} = getRgbOfColor(color);
        styleCss.push(`--primary-color-${index}: ${R},${G},${B}`);
    })
    document.documentElement.style.cssText += styleCss.join(';');
}
