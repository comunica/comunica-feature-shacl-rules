import type { IRecognitionException } from '@traqula/chevrotain';
import { ParserBuilder } from '@traqula/core';
import { sparql12ParserBuilder } from '@traqula/parser-sparql-1-2';
import * as TR11 from '@traqula/rules-sparql-1-1';
import type { SparqlContext } from '@traqula/rules-sparql-1-2';
import { formatShaclError } from './errorHelper.js';
import {
  shaclDataBlock,
  shaclDeclarationBlock,
  shaclHeadTemplate,
  shaclRule1,
  shaclRule2,
  shaclRuleBlock,
  triplesTemplateBlock,
} from './grammar/blocks.js';
import { shaclBuiltInCall } from './grammar/builtIn.js';
import { shaclPath, shaclPathElt, shaclPathPrimary } from './grammar/paths.js';
import { shaclSet, bodyBasic, bodyPattern, bodyPattern1, negation } from './grammar/patterns.js';
import { importsDecl, prologue1, shaclPrologue, shaclRuleOrDataBlock, shaclRuleSet } from './grammar/prologue.js';
import { shaclTokens } from './shaclTokens.js';
import type { RuleOrDataBlockType } from './shaclTypes.js';

const cleanup12ParserBuilder = ParserBuilder.create(sparql12ParserBuilder)
  .deleteMany(
    TR11.gram.pathMod.name,
    TR11.gram.pathNegatedPropertySet.name,
    TR11.gram.pathOneInPropertySet.name,
    TR11.gram.pathAlternative.name,
    TR11.gram.builtInBound.name,
    TR11.gram.builtInRand.name,
    TR11.gram.builtInMd5.name,
    TR11.gram.builtInSha1.name,
    TR11.gram.builtInSha256.name,
    TR11.gram.builtInSha384.name,
    TR11.gram.builtInSha512.name,
    TR11.gram.builtInCoalesce.name,
    TR11.gram.existsFunc.name,
    TR11.gram.notExistsFunc.name,
    TR11.gram.aggregate.name,
    TR11.gram.aggregateCount.name,
    TR11.gram.aggregateSum.name,
    TR11.gram.aggregateMin.name,
    TR11.gram.aggregateMax.name,
    TR11.gram.aggregateAvg.name,
    TR11.gram.aggregateSample.name,
    TR11.gram.aggregateGroup_concat.name,
    TR11.gram.queryOrUpdate.name,
    TR11.gram.queryUnit.name,
    TR11.gram.query.name,
    TR11.gram.selectQuery.name,
    TR11.gram.subSelect.name,
    TR11.gram.selectClause.name,
    TR11.gram.constructQuery.name,
    TR11.gram.constructTemplate.name,
    TR11.gram.constructTriples.name,
    TR11.gram.describeQuery.name,
    TR11.gram.askQuery.name,
    TR11.gram.valuesClause.name,
    TR11.gram.whereClause.name,
    TR11.gram.solutionModifier.name,
    TR11.gram.groupClause.name,
    TR11.gram.groupCondition.name,
    TR11.gram.havingClause.name,
    TR11.gram.havingCondition.name,
    TR11.gram.orderClause.name,
    TR11.gram.orderCondition.name,
    TR11.gram.limitOffsetClauses.name,
    TR11.gram.limitClause.name,
    TR11.gram.offsetClause.name,
    TR11.gram.groupGraphPattern.name,
    TR11.gram.groupGraphPatternSub.name,
    TR11.gram.graphPatternNotTriples.name,
    TR11.gram.optionalGraphPattern.name,
    TR11.gram.graphGraphPattern.name,
    TR11.gram.serviceGraphPattern.name,
    TR11.gram.minusGraphPattern.name,
    TR11.gram.groupOrUnionGraphPattern.name,
    TR11.gram.inlineData.name,
    TR11.gram.dataBlock.name,
    TR11.gram.inlineDataOneVar.name,
    TR11.gram.inlineDataFull.name,
    TR11.gram.dataBlockValue.name,
    TR11.gram.updateUnit.name,
    TR11.gram.update.name,
    TR11.gram.update1.name,
    TR11.gram.load.name,
    TR11.gram.clear.name,
    TR11.gram.drop.name,
    TR11.gram.create.name,
    TR11.gram.add.name,
    TR11.gram.move.name,
    TR11.gram.copy.name,
    TR11.gram.quadPattern.name,
    TR11.gram.quadData.name,
    TR11.gram.insertData.name,
    TR11.gram.deleteData.name,
    TR11.gram.deleteWhere.name,
    TR11.gram.modify.name,
    TR11.gram.deleteClause.name,
    TR11.gram.insertClause.name,
    TR11.gram.graphOrDefault.name,
    TR11.gram.graphRef.name,
    TR11.gram.graphRefAll.name,
    TR11.gram.quads.name,
    TR11.gram.quadsNotTriples.name,
    TR11.gram.datasetClause.name,
    TR11.gram.defaultGraphClause.name,
    TR11.gram.namedGraphClause.name,
    TR11.gram.sourceSelector.name,
    TR11.gram.usingClause.name,
    TR11.gram.datasetClauseStar.name,
    TR11.gram.usingClauseStar.name,
  );

export const shaclParserBuilder = ParserBuilder.create(cleanup12ParserBuilder)
  .addMany(
    shaclRuleSet,
    shaclRuleOrDataBlock,
    shaclPrologue,
    prologue1,
    importsDecl,
    shaclDataBlock,
    shaclRuleBlock,
    shaclRule1,
    shaclRule2,
    bodyPattern,
    bodyPattern1,
    shaclHeadTemplate,
    negation,
    bodyBasic,
    triplesTemplateBlock,
    shaclDeclarationBlock,
    shaclSet,
  )
  .patchRule(shaclPath)
  .patchRule(shaclPathElt)
  .patchRule(shaclPathPrimary)
  .patchRule(shaclBuiltInCall);

export type ShaclParserType = ReturnType<typeof shaclParserBuilder.build>;

function buildParserInstance(errorHandler: (errors: IRecognitionException[]) => void): ShaclParserType {
  return shaclParserBuilder.build({
    tokenVocabulary: shaclTokens,
    parserConfig: { skipValidations: false },
    lexerConfig: {
      positionTracking: 'full',
      skipValidations: false,
      ensureOptimizations: true,
    },
    errorHandler,
  });
}

export class ShaclParser {
  private readonly parser: ShaclParserType;
  private input = '';

  public constructor() {
    this.parser = buildParserInstance((errors) => {
      throw new Error(formatShaclError(this.input, errors));
    });
  }

  public parse(input: string, context: SparqlContext): RuleOrDataBlockType {
    this.input = input;
    const ast = this.parser.shaclRuleSet(input, context);
    validateAst(ast);
    return ast;
  }
}

function validateAst(ast: RuleOrDataBlockType) {
  for (const el of ast.elements) {
    if (el.type === 'shaclData') {
      validateDataBlock(el);
    }
  }
}

function validateDataBlock(dataNode: any) {
  const triples = dataNode.triples;
  if (!triples?.triples) return;
  for (const t of triples.triples) {
    if (t.subject?.subType === 'variable') throw new Error('Variables are not allowed in DATA block triples');
    if (t.predicate?.subType === 'variable') throw new Error('Variables are not allowed in DATA block triples');
    if (t.object?.subType === 'variable') throw new Error('Variables are not allowed in DATA block triples');
  }
}
