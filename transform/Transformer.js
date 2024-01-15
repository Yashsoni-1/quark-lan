/**
 * AST Transformer
 */

class Transformer 
{
    /**
     * Translates `def` -expression (function declaration)
     * into a variable declaration with a lambda
     * expression.
     */

    transforDefToVarLambda(defExp) {

        const [_tag, name, params, body] = defExp;

        // JIT-transpile to a variable declaration
        return ['var', name, ['lambda', params, body]];
    }


    transforSwitchToIfStatement(switchExp) {

        const [_tag, ...cases] = switchExp;

        const ifExp = ['if', null, null, null];
        let current = ifExp;

        for(let i=0; i<cases.length - 1; i++)
        {
            const [currentCond, currentBlock] = cases[i];
            current[1] = currentCond;
            current[2] = currentBlock;

            const next = cases[i + 1];
            const [nextCond, nextBlock] = next;
            current[3] = nextCond === 'else' ? nextBlock: ['if'];

            current = current[3];
        }

        return ifExp;
    }

    transformForToWhile(forExp) {
        const [_tag, init, condition, modifier, exp] = forExp;

        return ['begin', init, ['while', condition, ['begin', exp, modifier]]]
    }

    transformIncToSet(IExp) {
        const variab = IExp[1];
        return ['set', variab, ['+', variab, 1]];
    }

    transformDecToSet(DExp) {
        const variab = DExp[1];
        return ['set', variab, ['-', variab, 1]];
    }

    transformAddAssignmentToSet(AAExp) {
        const variab = AAExp[1];
        const value = AAExp[2];
        return ['set', variab, ['+', variab, value]];
    }

    transformSubtractAssignmentToSet(SAExp) {
        const variab = SAExp[1];
        const value = SAExp[2];
        return ['set', variab, ['-', variab, value]];
    }


}

module.exports = Transformer;