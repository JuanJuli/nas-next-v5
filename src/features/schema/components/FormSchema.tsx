'use client';

import { useFormSchemaContext } from "@/context/FormSchema";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useTranslations } from 'next-intl';
import { useFieldArray, useWatch, FormProvider } from "react-hook-form";

function ElementContent({ unitIndex, elementIndex, onRemove }: { unitIndex: number; elementIndex: number; onRemove: () => void }) {
  const t = useTranslations('form');
  const { formSchema } = useFormSchemaContext();
  const control = formSchema!.control;

  const { fields: kukFields, append: appendKuk, remove: removeKuk } = useFieldArray({
    control,
    name: `competency_unit.${unitIndex}.elements.${elementIndex}.kuks` as const,
  });

  return (
      <div className="ml-2 pl-4 space-y-2">
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-3">
            <FormField
              control={control}
              name={`competency_unit.${unitIndex}.elements.${elementIndex}.element_code`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('element-code')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('placeholder-element-code')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-3">
            <FormField
              control={control}
              name={`competency_unit.${unitIndex}.elements.${elementIndex}.element_name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('element-name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('placeholder-element-name')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button variant="destructive" size="sm" className="col-span-1 self-center mt-3" onClick={onRemove}>
            <Trash2 />
          </Button>
        </div>

        <div className="ml-2 space-y-2 border-l-2 border-blue-200 pl-[20px]">
          {kukFields.map((kukField, kIdx) => (
            <div key={kukField.id} className="flex items-start gap-2">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <FormField
                  control={control}
                  name={`competency_unit.${unitIndex}.elements.${elementIndex}.kuks.${kIdx}.kuk_code`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('kuk-code')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('placeholder-kuk-code')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`competency_unit.${unitIndex}.elements.${elementIndex}.kuks.${kIdx}.kuk_name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('kuk-name')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('placeholder-kuk-name')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button variant="destructive" size="sm" className="mt-6" onClick={() => removeKuk(kIdx)}>
                {t('btn-remove')}
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => appendKuk({ kuk_code: '', kuk_name: '' })}>
            <Plus /> {t('btn-add-kuk')}
          </Button>
        </div>
      </div>
  );
}

function UnitCompetencyContent({ index }: { index: number }) {
  const t = useTranslations('form');
  const { formSchema } = useFormSchemaContext();
  const control = formSchema!.control;

  const { fields: aspectFields, append: appendAspect, remove: removeAspect } = useFieldArray({
    control,
    name: `competency_unit.${index}.critical_aspects` as const,
  });

  const { fields: elementFields, append: appendElement, remove: removeElement } = useFieldArray({
    control,
    name: `competency_unit.${index}.elements` as const,
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`competency_unit.${index}.competency_unit_code`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('unit-code')}</FormLabel>
              <FormControl>
                <Input placeholder={t('placeholder-unit-code')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`competency_unit.${index}.competency_unit_name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('unit-name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('placeholder-unit-name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`competency_unit.${index}.sequence`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('unit-sequence')}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t('placeholder-unit-sequence')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`competency_unit.${index}.skk`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('unit-skkni')}</FormLabel>
              <FormControl>
                <Input placeholder={t('placeholder-unit-skkni')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`competency_unit.${index}.skk_year`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('unit-skkni-year')}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t('placeholder-unit-skkni-year')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="ml-4 border-l-2 border-orange-200 pl-4 space-y-2">
        {aspectFields.map((aspectField, aIdx) => (
          <div key={aspectField.id} className="flex items-start gap-2">
            <div className="flex-1">
              <FormField
                control={control}
                name={`competency_unit.${index}.critical_aspects.${aIdx}.aspect`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('critical-aspect')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('placeholder-critical-aspect')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button variant="destructive" size="sm" className="mt-6" onClick={() => removeAspect(aIdx)}>
              {t('btn-remove')}
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => appendAspect({ aspect: '' })}>
          <Plus /> {t('btn-add-aspect')}
        </Button>
      </div>

      <div className="ml-4 border-l-2 border-green-200 pl-4 space-y-4">
        {elementFields.map((elementField, eIdx) => (
          <ElementContent
            key={elementField.id}
            unitIndex={index}
            elementIndex={eIdx}
            onRemove={() => removeElement(eIdx)}
          />
        ))}
        <Button variant="outline" size="sm" onClick={() => appendElement({ element_code: '', element_name: '', kuks: [] })}>
          <Plus /> {t('btn-add-element')}
        </Button>
      </div>
    </div>
  );
}

export default function FormSchema() {
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const { formSchema, formSchemaFinish, onBack, schema } = useFormSchemaContext();
  const control = formSchema!.control;

  const { fields: unitFields, append: appendUnit, remove: removeUnit } = useFieldArray({
    control,
    name: 'competency_unit',
  });

  const watchedUnits = useWatch({ control, name: 'competency_unit' });

  const isRevisit = !!schema;

  const handleFinish = (data: any) => {
    formSchemaFinish?.(data)
  }

  return (
    <FormProvider {...formSchema!}>
      <div>
        <Card>
          <CardContent className="p-6">
            <h2 className="font-bold text-xl mb-4">{t('heading-detail-scheme')}</h2>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="schema_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('scheme-code')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('placeholder-scheme-code')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="schema_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('scheme-name')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('placeholder-scheme-name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="schema_license"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('scheme-license')}</FormLabel>
                    <div className="w-full">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger  className="w-full">
                            <SelectValue placeholder={t('placeholder-scheme-license')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent >
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="sjj">SJJ</SelectItem>
                          <SelectItem value="paperless">Paperless</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="schema_skkni"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('scheme-type')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('placeholder-scheme-type')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="schema_year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('scheme-year')}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={t('placeholder-scheme-year')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardContent className="p-6">
            <h2 className="font-bold text-xl mb-4">{t('heading-unit-competency')}</h2>
            <Accordion defaultValue={unitFields.length > 0 ? [unitFields[0].id] : []}>
              {unitFields.map((field, idx) => (
                <AccordionItem key={field.id} value={field.id}>
                  <AccordionTrigger>
                    <div className="flex items-center justify-between w-full pr-2">
                      <span>{watchedUnits?.[idx]?.competency_unit_name || `Unit Kompetensi ${idx + 1}`}</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); removeUnit(idx); }}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <UnitCompetencyContent index={idx} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button variant="outline" className="w-full mt-4" onClick={() => appendUnit({
              competency_unit_code: '', competency_unit_name: '', sequence: '', skk: '', skk_year: '',
              critical_aspects: [], elements: []
            })}>
              <Plus /> {t('btn-add-unit')}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 w-full max-h-[100px] p-4 border-t-2 flex justify-end gap-2 bg-background border-border">
        <Button variant="outline" onClick={onBack}>{tc('btn-kembali')}</Button>
        <Button onClick={() => formSchema!.handleSubmit(handleFinish)()}>
          {isRevisit ? tc('btn-simpan') : tc('btn-lanjutkan')}
        </Button>
      </div>
    </FormProvider>
  )
}
